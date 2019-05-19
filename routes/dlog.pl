prove(Goal) :- prove(Goal,[]).

prove(true,_) :- !.
prove((G1,G2),Ancs) :- !,
   prove(G1,Ancs),
   prove(G2,Ancs).
prove(G,Ancs) :-
   ( (G = (_==_); G = (_\==_)) -> call(G)
   ;
      member(G0,Ancs), G0 == G -> fail
   ;
      (G = -NegG -> true; NegG = -G),
      memberchk(NegG,Ancs)
   ;
      theory:clause(G,B),
      prove(B,[G|Ancs])
   ).   
