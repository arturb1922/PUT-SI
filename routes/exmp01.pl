%%%  Remarks:
%%%  --------
%%%  See:
%%%  https://repozitorium.omikk.bme.hu/bitstream/handle/10890/698/ertekezes.pdf?sequence=1&isAllowed=y
%%%  , example on page 47.
%%%  
%%%  Knowledge base:
%%%  ---------------

alcoholic(Y) :-
   hasParent(X,Y),
   alcoholic(X).

-alcoholic(X) :-
   hasFriend(X,Y),
   alcoholic(Y).
-alcoholic(Y) :-
   hasFriend(X,Y),
   alcoholic(X).
-alcoholic(X) :-
   hasParent(X,Y),
   -alcoholic(Y).

-hasFriend(X,Y) :-
   alcoholic(X),
   alcoholic(Y).

-hasParent(X,Y) :-
   alcoholic(X),
   -alcoholic(Y).

hasParent(i1,i2).
hasParent(i1,i3).

hasFriend(i2,i3).

%%%  Goal          | Answer
%%%  --------------+--------
%%%  -alcoholic(X) | X = i1
