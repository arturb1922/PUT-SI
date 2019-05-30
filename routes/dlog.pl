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

unload_last_source:-
  findall(Source, source_file(Source), LSource),
  reverse(LSource, [Source|_]),
  unload_source(Source).

unload_source(Source):-
  ground(Source),
  source_file(Pred, Source),
  functor(Pred, Functor, Arity),
  abolish(Functor/Arity),
  fail.
unload_source(_).