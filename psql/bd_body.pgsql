


CREATE TABLE IF NOT EXISTS USERS (
    ID SERIAL PRIMARY KEY, 
    PASSWORD VARCHAR(20) UNIQUE, 
    USERNAME VARCHAR(20) UNIQUE,
    BALANCE INT
);

CREATE TABLE IF NOT EXISTS EVENTS (
    ID SERIAL PRIMARY KEY, 
    author int references users (id),
    ENAME VARCHAR(20), 
    EDESCRIPTION TEXT,
    DATE_BEG TIMESTAMP,
    DATE_END TIMESTAMP,
    CLOSED BOOLEAN DEFAULT FALSE,
    RESULT INT,
    RESPONSIBLE int REFERENCES USERS (ID),
    COEFY REAL default 0,
    COEFN REAL default 0
);

CREATE TABLE IF NOT EXISTS HISTORY (
    ID SERIAL PRIMARY KEY, 
    EID INT REFERENCES EVENTS (ID),
    UID INT REFERENCES USERS (ID),
    RESULT INT,
    BET INT
);

CREATE OR REPLACE FUNCTION his_upd()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
declare
    tmpy int;
    tmpn int;
BEGIN
    select sum(BET)  into tmpn from HISTORY where eid=new.eid and result=1;
    select sum(BET)  into tmpy from HISTORY where eid=new.eid and result=0;
    if tmpn>0 and tmpy>0 THEN
        update EVENTS set coefy = 1+(tmpn)/(tmpy), coefn=1+(tmpy)/(tmpn) where id=new.eid;
    end if;
	RETURN new;

END;
$$;


CREATE or replace TRIGGER on_history_update
  after insert
  ON HISTORY
  FOR EACH ROW
  EXECUTE procedure his_upd();

--функция на закрытие ставки(распределение баланса)
create or replace PROCEDURE close_event(id_ int,res_ int)
language plpgsql
as
$$
declare
    tsum int;
    fsum int;
    part_koef real;
    koef REAL;


begin
    if (select closed from EVENTS where id = id_) then
        raise exception 'already closed';
    end if;

    update EVENTS set closed = true, RESULT = res_, date_end = CURRENT_TIMESTAMP where id = id_;
    select sum(bet) into tsum from history where eid = id_ and RESULT = 0;
    select sum(bet) into fsum from history where eid = id_ and RESULT = 1;
    if tsum is null or fsum is null or res_=2 then
        update users as cl set balance = balance + (select bet from history where UID = cl.id and EID = id_) where not ((select bet from history where UID = cl.id and EID = id_) is null);
    ELSE
        if res_=0 then
            update users as cl set balance = balance + (cast((select bet from history where UID = cl.id and EID = id_) as float)/tsum)*(tsum+fsum) where (select RESULT from history where UID = cl.id and EID = id_);
        ELSE
            update users as cl set balance = balance + (cast((select bet from history where UID = cl.id and EID = id_ ) as float)/fsum)*(tsum+fsum) where not (select RESULT from history where UID = cl.id and EID = id_);
    end if;
    end if;
   
    
end;
$$;

--функция для совершения ставки
create or replace PROCEDURE place_a_bet(eid_ int,username_ varchar(20),size int,result_ int)
language plpgsql
as
$$
declare
    uid_ int;
begin
    if size <= 0 then
        raise exception 'lickmaballs';
    end if;
    select id into uid_ from users where USERNAME = username_;
    if (select balance from users where id = uid_) < size THEN
        raise exception 'not enough balance';
    end if;
    perform from history where uid = uid_ and eid = eid_;
    if FOUND THEN
        raise exception 'bet has been already placed';
    end if;

    insert into history (eid, uid,result,bet) values (eid_,uid_,result_,size);
    update users set balance = balance - size where id = uid_;
end;
$$;