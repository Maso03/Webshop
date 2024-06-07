#import "template.typ" : template

#show: template.with(
  title: "Entwicklung eines Webshops",
  subtitle: "Studienarbeit",
  authors: ("Masoud Abdulhanan", "Niklas Krüger"),
  student-ids: (9769728, 7777777),
  date: datetime(year: 2024, month: 6, day: 16),
  logos: (image("assets/dhbw.svg", width: 30%),),

  abstract: include "abstract.typ", 
)

#include "./chapters/introduction.typ"
#include "./chapters/entwurf.typ"
#bibliography("./references.yml")