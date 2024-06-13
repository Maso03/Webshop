#import "template.typ" : template

#show: template.with(
  title: "Entwicklung eines Webshops",
  subtitle: "Studienarbeit | Betreuer: Dominik Rietz",
  authors: ("Masoud Abdulhanan", "Niklas Krüger"),
  student-ids: (9769728, 8358271),
  date: datetime(year: 2024, month: 6, day: 13),
  logos: (image("assets/dhbw.svg", width: 30%),),

  abstract: include "abstract.typ", 
)

#include "./chapters/introduction.typ"
#include "./chapters/entwurf.typ"
#include "/paper/chapters/frontendEntwurf.typ"
#include "/paper/chapters/abschluss.typ"
#bibliography("./references.yml")