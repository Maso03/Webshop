= Einleitung
== Hintergrund und Motivation

Die digitale Transformation hat in den letzten Jahrzehnten das Gesicht des Einzelhandels radikal verändert. Die Entwicklung des E-Commerce hat nicht nur neue Geschäftsmodelle ermöglicht, sondern auch die Erwartungen und das Verhalten der Verbraucher grundlegend verändert. Diese Veränderung wird durch die weitreichende Verfügbarkeit des Internets und die zunehmende Nutzung mobiler Geräte weiter beschleunigt. Studien zeigen, dass der E-Commerce-Markt weltweit boomt, was auf die zahlreichen Vorteile zurückzuführen ist, die diese Einkaufsform sowohl für Unternehmen als auch für Verbraucher bietet @WF17 @Dropshipping.

E-Commerce, oder elektronischer Handel, bezeichnet den Kauf und Verkauf von Waren und Dienstleistungen über das Internet. Dabei werden verschiedene Zahlungsmethoden wie Kreditkarten, Debitkarten, Online-Banking und Zahlung über digitale Geldbörsen genutzt @Dropshipping. Die Verfügbarkeit einer breiten Produktpalette zu wettbewerbsfähigen Preisen und die Möglichkeit, bequem von zu Hause aus zu shoppen, haben den E-Commerce zu einer bevorzugten Einkaufsform gemacht. Die bedeutendsten Treiber dieses Wachstums sind die zunehmende Verbreitung des Internets, die verbesserte Infrastruktur für digitale Zahlungen und der Einsatz von Technologien wie Big Data und Künstliche Intelligenz (KI), die personalisierte Einkaufserlebnisse ermöglichen @B2B.

Ein besonderer Aspekt des E-Commerce, der in den letzten Jahren erheblich an Bedeutung gewonnen hat, ist das Dropshipping. Dropshipping ist ein Geschäftsmodell, bei dem Einzelhändler keine eigenen Lagerbestände halten, sondern Bestellungen direkt vom Großhändler oder Hersteller an den Endkunden versenden lassen. Dies reduziert die Anfangsinvestitionen und das finanzielle Risiko für neue Unternehmen erheblich und ermöglicht es ihnen, eine breite Produktpalette anzubieten, ohne große Lagerbestände verwalten zu müssen @Dropshipping. 

Die wachsende Popularität von E-Commerce und Dropshipping wird durch beeindruckende Marktstatistiken unterstützt. Der globale E-Commerce-Markt verzeichnete 2020 ein Umsatzvolumen von 4,28 Billionen US-Dollar und wird voraussichtlich bis 2023 auf 6,54 Billionen US-Dollar anwachsen. Dies entspricht einer durchschnittlichen jährlichen Wachstumsrate (CAGR) von etwa 10,7% @WF17. 

Die Abbildung unten zeigt die meistbesuchten Websites in Deutschland im März 2024. Dabei ist deutlich zu erkennen, dass große E-Commerce-Plattformen wie Amazon eine signifikante Anzahl monatlicher Besuche verzeichnen, was die Relevanz und den Einfluss von E-Commerce im digitalen Raum unterstreicht 
#figure(
  image("/paper/assets/amazon.png", width: 50%),
  caption: [Meistbesuchte Webseiten in Deutschland im März 2024, Quelle: Statista],
) <cluster-single-node>
.

== Zielsetzung der Studienarbeit

Die vorliegende Studienarbeit zielt darauf ab, einen modernen Webshop zu konzipieren und umzusetzen, der den aktuellen Anforderungen des E-Commerce entspricht. Dabei sollen sowohl funktionale Anforderungen wie Benutzerkontenverwaltung, Artikelanzeige und -suche, Warenkorb und Kassenfunktionen als auch nicht-funktionale Anforderungen wie Performance, Skalierbarkeit und Sicherheit berücksichtigt werden @B2B. Ein besonderer Fokus liegt auf der Integration eines Adminbereichs, der die effiziente Verwaltung des Webshops ermöglicht.

Die Arbeit umfasst die Analyse bestehender E-Commerce-Plattformen, um Best Practices zu identifizieren und innovative Ansätze zu entwickeln, die den Webshop sowohl benutzerfreundlich als auch technisch robust machen. Methodisch wird die Arbeit durch eine Kombination aus Literaturrecherche, Analyse bestehender Webshops und der praktischen Umsetzung eines eigenen Prototyps durchgeführt @B2B.

== Relevanz des Themas im Kontext des E-Commerce

Im Kontext des E-Commerce ist die Entwicklung eines effizienten und benutzerfreundlichen Webshops von zentraler Bedeutung. Der Erfolg eines Online-Shops hängt maßgeblich von der Benutzererfahrung ab, die durch ein intuitives Design, schnelle Ladezeiten und eine sichere Zahlungsabwicklung gewährleistet wird. Ein gut gestalteter Webshop kann die Kundenzufriedenheit erhöhen, die Kundenbindung stärken und somit den Umsatz steigern @WF17 @Dropshipping.

Darüber hinaus spielt der E-Commerce eine wichtige Rolle in der heutigen Wirtschaft, indem er Unternehmen ermöglicht, ihre Reichweite zu erweitern und neue Märkte zu erschließen. Insbesondere das Dropshipping-Modell bietet eine attraktive Möglichkeit für Start-ups und kleine Unternehmen, ohne große Anfangsinvestitionen in den Markt einzutreten und von den Vorteilen des Online-Handels zu profitieren @Dropshipping.

Die folgende Abbildung zeigt die prognostizierte Anzahl der Social-Commerce-Nutzer in den USA bis 2023, was die zunehmende Bedeutung und das Wachstumspotenzial des E-Commerce im sozialen Kontext verdeutlicht
#figure(
  image("/paper/assets/usa.png", width: 70%),
  caption: [Anzahl der Social-Commerce-Nutzer in den USA],
) <cluster-single-node>
.

Zusätzlich zeigt die Abbildung die Anzahl der Transaktionen über PayPal weltweit, was die wachsende Nutzung digitaler Zahlungssysteme und die damit verbundene Sicherheit und Effizienz im E-Commerce unterstreicht
#figure(
  image("/paper/assets/paypal.png", width: 70%),
  caption: [Anzahl der Transaktionen über PayPal weltweit],
) <cluster-single-node>
.

Die Abbildungen unten zeigen das Wachstum des Online-Einzelhandelsmarktes in China sowie das Gesamtvolumen der E-Commerce-Transaktionen von 2004 bis 2016. Diese Diagramme illustrieren die rasante Entwicklung und die wirtschaftliche Bedeutung des E-Commerce in einem der größten Märkte weltweit
#figure(
  image("/paper/assets/china1.png", width: 70%),
  caption: [Wachstum des Online-Einzelhandelsmarktes in China],
) <cluster-single-node>

#figure(
  image("/paper/assets/china2.png", width: 70%),
  caption: [Gesamtvolumen der E-Commerce-Transaktionen in China],
) <cluster-single-node>
.


= Analysephase
== Definition der Anforderungen

Die Definition der Anforderungen an den Webshop umfasst sowohl funktionale als auch nicht-funktionale Aspekte. Zu den funktionalen Anforderungen zählen die Verwaltung von Benutzerkonten, die Bereitstellung einer benutzerfreundlichen Such- und Filterfunktion, die Integration eines Warenkorbsystems sowie die sichere Abwicklung von Zahlungen @B2B.

Nicht-funktionale Anforderungen betreffen die Performance, Skalierbarkeit und Sicherheit des Webshops. Hierbei ist sicherzustellen, dass der Webshop auch bei hohen Zugriffszahlen stabil und zuverlässig funktioniert. Zudem müssen Datenschutzrichtlinien eingehalten werden, um die Sicherheit der Kundendaten zu gewährleisten.

== Zielgruppenanalyse

Die Zielgruppenanalyse ist ein entscheidender Schritt in der Entwicklung eines Webshops. Sie dient dazu, die Bedürfnisse und Erwartungen der potenziellen Nutzer zu verstehen und den Webshop entsprechend auszurichten. Dabei werden demografische Daten, Einkaufsverhalten und Präferenzen der Zielgruppe untersucht.

Eine erfolgreiche Zielgruppenanalyse ermöglicht es, den Webshop so zu gestalten, dass er die gewünschten Kundensegmente anspricht und eine hohe Benutzerzufriedenheit erzielt. Dies beinhaltet auch die Anpassung des Designs und der Funktionalitäten an die spezifischen Anforderungen der Zielgruppe @B2B.

== Recherche und Analyse bestehender Webshops und E-Commerce-Strategien

Die Recherche und Analyse bestehender Webshops bietet wertvolle Einblicke in bewährte E-Commerce-Strategien und Designprinzipien. Durch die Untersuchung von erfolgreichen Online-Shops können Best Practices identifiziert und Schwachstellen vermieden werden.

Zu den analysierten Aspekten gehören die Benutzerfreundlichkeit, das Design, die Navigationsstruktur und die Integration von Zahlungs- und Versandoptionen. Darüber hinaus werden auch Marketingstrategien und Kundenbindungsmaßnahmen bestehender Webshops untersucht, um deren Effektivität zu bewerten und gegebenenfalls zu adaptieren @B2B.

Durch die Kombination aus theoretischem Wissen und praktischen Einblicken wird eine solide Grundlage für die Entwicklung eines leistungsfähigen und benutzerfreundlichen Webshops geschaffen.

=== Amazon: Kernelemente und Features

Amazon ist der größte Online-Versandhändler in Deutschland, und die Webseite amazon.com ist drittpopulärste Webseite in Deutschland (Siehe Abbildung 1). Daher kann der Internetauftritt von Amazon's Webshop als Inspiration für wichtige Features und Webseitendesign fungieren.

#figure(
  image("/paper/assets/amazon_landing.PNG"),
  caption: [Die Startseite des Amazon-Webshop, Quelle: amazon.de @Amazon]
)

Beim Besuch der Webseite werden sofort mehrere interessante Features bemerkt:
#list(
  [Dem Kunden werden direkt Produktangebote auf der Startseite gezeigt],
  [Der Kunde kann ohne einen Account anzulegen durch den Webshop stöbern],
  [Am oberen Bildschirmrand befindet sich eine Suchleiste, von der jederzeit Produkte gesucht werden können],
  [Das Amazon-Logo befindet sich jederzeit in der oberen linken Ecke und fungiert als Navigationselement auf die Startseite]
)

Diese Features haben unterschiedliche Funktionen:

Das sofortige Anzeigen von Produktangeboten sowie die Möglichkeit den Webshop ohne Account zu erkunden, verringert die Barriere zum Einstieg für einen Kunden, der den Webshop nutzen will. Würden sich auf der Startseite z.B. nur Kategorien befinden oder müsste der Nutzer zuerst einen Account anlegen um den Webshop nutzen zu können, dann würde ein großer Teil der möglichen Kunden abspringen, bevor sie überhaupt das erste Produkt gesehen haben. Dies verringert den Umsatz des Webshops, da potentielle Kunden verloren gehen und keinen Umsatz erzielen.

Die konstanten Navigationselemente wie das Amazon-Logo als Navigation zur Startseite sowie die Suchleiste als schneller Weg zum Produktebrowser sind von allen Routen der Webseite aus verfügbar. Somit können Nutzer jederzeit auf die Startseite sowie auf gesuchte Produkte zugreifen. Wäre dies nicht der Fall, und der Nutzer müsste jedes Mal mühsam von einem Produkt zum nächsten navigieren, wird eine Hürde zwischen dem Nutzer und dem Kauf weiterer Produkte aufgebaut. Auch dies verringert den potentiellen Umsatz.

Features wie eine permanente Navigationsleiste zu den Produktangeboten, sowie eine Möglichkeit sofort ohne Hindernisse auf Produkte zugreifen zu können, sind essentiell um ein angenehmen Nutzererlebnis sowie den Umsatz des Webshops zu steigern. Daher sollten diese Features in das Design des Webshops übernommen werden. 

Zusätzlich zu diesen Features zeigt Amazon durch seine Größe eine immense Anzahl an weiteren Features auf, welche für den in dieser Studienarbeit entwickelten Prototypen nicht umsetzbar wären. Dazu gehören u.a. Funktionalitäten für Rücksendungen und Warenverfolgung und Einkaufsmöglichkeiten sowie Links zu weiteren digitalen Angeboten wie Amazon Prime oder Prime Video. Um einen Überblick über das Design eines kleineren Webshops zu erhalten soll im nächsten Schritt ein limitierterer Webshop analysiert werden. 

=== Bauhaus: Corporate Design

Bauhaus ist ein kleinerer Online-Shop, welcher im Gegensatz zu Amazon eine limitiertere Auswahl an Produkten hat. Es wird sich auf Baumarktartikel begrenzt. Daher ist Bauhaus ein ideales Beispiel für einen kleineren und in dieser Studienarbeit umsetzbaren Webshop. Auch auf Bauhaus.de finden wir persönliche Angebote und hervorgehobene Produkte, sowie konstante Navigationselemente. Diese sind für einen Webshop imperativ und werden daher von Webshops aller Größen angewandt.
#figure(
  image("/paper/assets/Bauhaus.PNG"),
  caption: [Die Startseite des Bauhaus Online-Shop, Quelle: bauhaus.info @Bauhaus]
)

Im Gegensatz zu Amazon sehen wir hier aber ein deutlich konstanteres Farbschema. Während Amazon unterschiedliche Medialelemente verwendet, ist auf Bauhaus ein Rot-Weißes Farbschema konstant durch die Webseitengestaltung erkennbar. Dieses konstante Farbschema gehört zum Corporate Design von Bauhaus, und ist besonders für Webshops mit begrenzter Produktauswahl wichtig, um dem Webshop eine distinkte Identität zu geben. Das Thema Corporate Design sollte also auch für den in dieser Studienarbeit entwickelten Webshop thematisiert werden. Bauhaus ist bereits eine etablierte Marke mit Präsenzgeschäften, und konnte daher das bereits existierende Corporate Design dieser Geschäfte auf den Webshop anwenden. Der zu entwickelnde Webshop für diese Studienarbeit kann sich nicht einem bereit existierenden Corporate Design bedienen. Im Rahmen dessen soll der Webshop eine klare neue Corporate Identity zugewiesen bekommen, wozu folgende Elemente zu entwerfen sind:
#list(
  [Ein interessanter Name],
  [Ein einprägsames Logo],
  [Ein markantes Farbschema]
)

Diese Punkte werden im Rahmen der Webseitengestaltung in einem späteren Kapitel thematisiert. 