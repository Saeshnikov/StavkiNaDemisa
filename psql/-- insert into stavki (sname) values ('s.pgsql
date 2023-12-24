-- insert into stavki (sname) values ('stavka1');
-- insert into clients (secret_code, balance) values ('client1',100);
-- insert into clients (secret_code, balance) values ('client2',100);
-- insert into clients (secret_code, balance) values ('client3',100);

-- -- call place_a_bet(1,1,50,true);
-- call place_a_bet(1,'client2',74,false); 
-- call place_a_bet(1,'client3',25,false);

-- -- call close_stavka(1, false);

SELECT * FROM CLIENTS order by id;

SELECT * FROM STAVKI order by id;

SELECT * FROM HISTORY order by id;

