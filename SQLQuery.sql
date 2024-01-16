create login calendar
with password = 'sqlcalendar'


create user calendar for login calendar

alter server role sysadmin add member calendar
--create database calendar
go

use calendar

create table monthTurn(
	dia int primary key check(dia >= 1 and dia <=31),
	TT varchar(40),
	TM varchar(40)
)

insert into monthTurn (dia, TM, TT) values (1, null, null)
insert into monthTurn (dia, TM, TT) values (2, 'Vallejos Franco', null)
insert into monthTurn (dia, TM, TT) values (3, null, null)
insert into monthTurn (dia, TM, TT) values (4, 'Vallejos Franco', null)
insert into monthTurn (dia, TM, TT) values (5, null, 'Vallejos Franco')
insert into monthTurn (dia, TM, TT) values (6, null, null)
insert into monthTurn (dia, TM, TT) values (7, 'Vallejos Franco', null)
insert into monthTurn (dia, TM, TT) values (8, null, 'Vallejos Franco')
insert into monthTurn (dia, TM, TT) values (9, null, null)
insert into monthTurn (dia, TM, TT) values (10, null, 'Vallejos Franco')

select * from monthTurn
