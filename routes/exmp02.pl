%%%  Remarks:
%%%  --------
%%%  See:
%%%  https://repozitorium.omikk.bme.hu/bitstream/handle/10890/698/ertekezes.pdf?sequence=1&isAllowed=y
%%%  , example on page 16.
%%%  
%%%  Knowledge base:
%%%  ---------------

ans(X) :-
   hasChild(X,Y),
   patricide(Y),
   hasChild(Y,Z),
   -patricide(Z).

patricide(Z) :-
   -ans(X),
   hasChild(X,Y),
   patricide(Y),
   hasChild(Y,Z).
patricide(oedipus).

-patricide(Y) :-
   -ans(X),
   hasChild(X,Y),
   hasChild(Y,Z),
   -patricide(Z).
-patricide(thersandros).

-hasChild(X,Y) :-
   -ans(X),
   patricide(Y),
   hasChild(Y,Z),
   -patricide(Z).
-hasChild(Y,Z) :-
   -ans(X),
   hasChild(X,Y),
   patricide(Y),
   -patricide(Z).

hasChild(iocaste,oedipus).
hasChild(iocaste,polyneikes).
hasChild(oedipus,polyneikes).
hasChild(polyneikes,thersandros).

%%%  Goal          | Answer
%%%  --------------+-------------
%%%  ans(X)        | X = iocaste
