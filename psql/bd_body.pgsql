
drop table history;
drop table stavki;
drop table clients;

CREATE TABLE IF NOT EXISTS CLIENTS (
    ID SERIAL PRIMARY KEY, 
    SECRET_CODE VARCHAR(20), 
    BALANCE INT
);
CREATE TABLE IF NOT EXISTS STAVKI (
    ID SERIAL PRIMARY KEY, 
    SNAME VARCHAR(20), 
    SDESCRIPTION TEXT,
    DATE_BEG TIMESTAMP,
    DATE_END TIMESTAMP,
    CLOSED BOOLEAN DEFAULT FALSE,
    RESULT BOOLEAN
);

CREATE TABLE IF NOT EXISTS HISTORY (
    ID SERIAL PRIMARY KEY, 
    SID INT REFERENCES STAVKI (ID),
    CID INT REFERENCES CLIENTS (ID),
    PREDICTION BOOLEAN,
    BET INT
);

--блок для установки глобальных переменных

--функция на закрытие ставки(распределение баланса)
create or replace PROCEDURE close_stavka(id_ int,res_ BOOLEAN)
language plpgsql
as
$$
declare
    tsum int;
    fsum int;
    part_koef real;
    koef REAL;


begin
    if (select closed from stavki where id = id_) then
        raise exception 'already closed';
    end if;

    update stavki set closed = true, RESULT = res_, date_end = CURRENT_TIMESTAMP where id = id_;
    select sum(bet) into tsum from history where sid = id_ and prediction = true;
    select sum(bet) into fsum from history where sid = id_ and prediction = false;
    if tsum is null then
        update clients as cl set balance = balance + (select bet from history where CID = cl.id and SID = id_);
    ELSE
        if res_ then
            update clients as cl set balance = balance + (cast((select bet from history where CID = cl.id and SID = id_) as float)/tsum)*(tsum+fsum) where (select prediction from history where CID = cl.id and SID = id_);
        ELSE
            update clients as cl set balance = balance + (cast((select bet from history where CID = cl.id and SID = id_ ) as float)/fsum)*(tsum+fsum) where not (select prediction from history where CID = cl.id and SID = id_);
    end if;
    end if;
   
    
end;
$$;

--функция для совершения ставки
create or replace PROCEDURE place_a_bet(sid_ int,secret_code_ varchar(20),size int,predict_ BOOLEAN)
language plpgsql
as
$$
declare
    cid_ int;
begin
    if size <= 0 then
        raise exception 'lickmaballs';
    end if;
    select id into cid_ from clients where secret_code = secret_code_;
    if (select balance from clients where id = cid_) < size THEN
        raise exception 'not enough balance';
    end if;
    perform from history where cid = cid_;
    if FOUND THEN
        raise exception 'bet has been already placed';
    end if;

    insert into history (sid, cid,prediction,bet) values (sid_,cid_,predict_,size);
    update clients set balance = balance - size where id = cid_;
end;
$$;