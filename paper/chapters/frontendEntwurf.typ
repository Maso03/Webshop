= Frontend Technologieauswahl
In diesem Abschnitt wird der Entwurf des Frontend-Systems beschrieben. Hier soll ein detaillierter Überblick über die Frontend-Technologieauswahl gegeben werden. Anschließend soll die Frontend-Architektur für die Entwicklung des Webshops aufgezeigt werden. Dazu gehören Übergangsdiagramme der Webseite, Wireframes der unterschiedlichen Seiten, und unterschiedliche Prototypen des visuellen Designs und Designschemas. 

== Frontend-Framework

Die Anzahl an verfügbaren Web Frameworks sowohl für die Entwicklung von Frontend als auch Backend Applikationen wächst stetig an. 
Die folgende Abbildung zeigt einen Ausschnitt aus einer StackOverflow-Studie, welche die am meisten genutzten Frontend-Frameworks vergleicht.
#figure(
  image("/paper/assets/frontend_frameworks.PNG"),
  caption: [Frontend-Frameworks mit den meisten Fragen auf Stack Overflow. Quelle: Github | Tanguy Krotoff]
) <cluster-single-node>

Im folgenden Abschnitt werden die populärsten Frameworks kurz beleuchtet und einige Vor- und Nachteile bezüglich der Anwendung in einem Webshop-Projekt evaluiert.

=== React

React, entwickelt von Facebook in 2013, ist das beliebteste Frontend-Framework. Es ist weit verbreitet und auch in vielen Stellenausschreibungen für Frontend-Entwickler vertreten. 
Ausschlaggebend ist für viele Entwickler dabei die große React-Community, die durch die große Popularität des Frameworks Tutorials und Bibliotheken für zahlreiche Anwendungsfälle ermöglicht. React ist im Kern ein sehr minimales Framework. Das bedeutet, dass sehr viele Aufgaben wie Routing von Open-Source Third-Party Bibliotheken übernommen werden. React ermöglicht es, dynamische und komplexe Nutzer-Interfaces zu erstellen, und ist dabei durch sein Virtual DOM schneller darin Webanwendungen zu erstellen.

=== Angular

Angular, entwickelt und verwendet von Google, ist ebenfalls ein sehr populäres Frontend-Framework. Es verwendet das reguläre DOM-Modell, TypeScript als Programmiersprache und Testing über das Jasmine Testing Framework. Zusätzlich bietet Angular auch offizielle Bibliotheken für Routing, Animationen und Server Side Rendering. Allerdings hat Angular auch eine hohe Lernkurve, da es relativ fest vorschreibt wie ein Projekt zu organisieren und strukturieren ist. Dadurch sinkt die Flexibilität eines Angular Projektes. Durch seine feine Strukturierung ist Angular sehr gut geeignet für größere Projekte mit größeren Teams, während für kleinere Projekte mit 1-2 Entwicklern die komplexe Struktur eher ungeeignet ist. Nach React ist Angular das am zweitmeiste heruntergeladene Framework auf npm. 

=== Vue.js

Vue.js ist ein von Evan You unabhängig entwickelt und gewartetes Framework. Es hat Ähnlichkeiten zu Angular, ist aber zugänglicher für einzelne Entwickler und kleinere Projekte. Vue besitzt offizielle Packages für Routing und State Management und stützt sich in weiteren Funktionen auf ein großes Ökosystem an Third-Party Kontributionen. Seine Popularität ist auf dem gleichen Niveau wie Angular, mit einer änhlichen Anzahl an npm-Downloads pro Monat. Vue sticht auch durch sein Nutzerfreundliches CLI hervor, welches den Entwickler über eine Browser-GUI durch die Erstellung eines Projektes leitet. 

=== Svelte

Svelte, entwickelt von Rich Haris, ist ein aufstrebendes Frontend-Framework, das sich durch eine individuelle Herangehensweise an die Webentwicklung von anderen Frameworks absetzt. Im Gegensatz zu React, Angular und Vue, die zur Laufzeit im Browser arbeiten, kompiliert Svelte den Code zur Built-Zeit in imperativen Code, der die DOM direkt aktualisiert. Dies führt zu schnelleren Ladezeiten und besserer Performance. Durch den integrierten Hot-Module-Replacement-Entwicklungs-Server können trotzdem Live-Änderungen im Browser aktualisiert werden. Svelte bietet keine offiziellen Bibliotheken für Funktionen wie Routing oder State Management, diese werden von Community-Lösungen übernommen. Svelte hat aber eine deutlich kleinere Community und somit auch weniger Third-Party Bibliotheken als React, Angular und Vue. Svelte hat auch eine relativ flexible Projektstruktur und eine flachere Lernkurve im Vergleich zu den größeren und umfangsreicheren Frameworks. Svelte kam auch in einer StackOverflow-Umfrage zu den Vorlieben bei der Entwicklung mit unterschiedlichen Frameworks auf den ersten Platz, wobei über 70% aller Entwickler zugegeben haben gerne mit Svelte zu arbeiten.

#figure(
  image("/paper/assets/frameworks_opinion.PNG", width: 80%),
  caption: [Ergebnisse einer Stack Overflow-Umfrage zum Thema, mit welchem Framework am liebsten gearbeitet wird. Quelle: Stack Overflow Annual Developer Survey 2021]
) <cluster-single-node>

=== Vergleich der Frameworks anhand fester Kriterien

Um ein Framework auszuwählen wurden folgende Faktoren in die Entscheidung einbezogen:
#list(
  [Entwicklungsaufwand und Lernkurve],
  [Developer Experience],
  [Community-Support],
  [Eignung für kleinere bis mittlere Projektgrößen]
)

#table(
  columns: (auto, auto, auto, auto),
  inset: 10pt,
  align: horizon,
  table.header(
    [*Framework*], [*Support*], [*Lernkurve*], [*Eignung*],
  ),
  "React", "Große Anzahl an Community-Lösungen und Support verfügbar", "Relativ steile Lernkurve für Neulinge, guter Enstieg für Entwickler mit Web-Dev-Erfahrung", "Für jede Projektgröße geeignet",
  "Angular", "Eingebaute Lösungen für viele gängige Anforderungen", "Sehr steile Lernkurve mit strikter Projektstruktur.", "Eher für größere Projekte und Teams geeignet",
  "Vue.js", "Offizielle Packages für gängige Anforderungen und angemessenes Ökosystem an Third-Party Bibliotheken und Support", "Relativ flache Lernkurve", "Für einzelne Entwickler gut geeignet",
  "Svelte", "Geringe Anzahl and Ressourcen", "Relativ flache Lernkurve", "Für einzelne Entwickler gut geeignet",
) Quelle: @Framework-Vergleich
 
=== Auswahl

Für die Entwicklung des Webshops wird das *React-Framework* gewählt, da es sich für jede Projektgröße eignet und somit auch für ein kleines Team von 1-2 Entwicklern geeignet ist. React sticht vor allem durch die große und aktive Community heraus, was bedeutet dass problemlos Tutorials, Forenbeiträge, Bibliotheken und Tools zu jedem Problem gefunden werden können, was den Entwicklungsaufwand und die Developer Experience maßgeblich verbessert. 

== CSS-Framework
Für das Projekt wird ein CSS-Framework und kein blankes CSS verwendet, da es für ein React-Projekt zahlreiche Vorteile bietet. Ein CSS-Framework wie z.B. *Bootstrap* @Bootstrap oder *Tailwind CSS* @Tailwind stellt eine Sammlung vorgefertigter Stile und Komponenten bereit, die die Entwicklungszeit erheblich verkürzen. Außerdem ermöglicht CSS Framework das Einhalten eines einheitlichen Stils, was zu einem konsistenten "Look and Feel" der Webseite über verschiedene Seiten hinweg führt. So wird Nutzern das Navigieren erleichtert. Zusätzlich haben CSS-Frameworks oft eingebaute Methoden um Responsive Design zu ermöglichen, also die korrekte Darstellung der Komponenten auf unterschiedlichen Bildschirmgrößen, ohne das zusätzlicher Entwicklungsaufwand entsteht. @CSS-Framework

=== Tailwind CSS
Tailwind CSS hebt sich von anderen CSS-Frameworks insofern ab, dass es keine vordefinierten Komponenten bereitstellt, welche eine gewisse Richtung vorgeben würden. Stattdessen bietet Tailwind CSS eine Sammlung von niedrigstufigen Utility-Klassen, die dem Entwickler die Möglichkeit geben selbst eigene Designs zu entwerfen ohne sich dabei groß mit dem hinterliegenden CSS auseinandersetzen zu müssen. 

In der State of CSS Studie 2023 sticht Tailwind CSS als der Vorreiter in der Developer Experience heraus, mit einer deutlichen Mehrheit in Entwicklern die mit Tailwind CSS arbeiten und es weiterhin nutzen würden

#figure(
  image("/paper/assets/CSS_Framework_Survey.PNG", width: 100%),
  caption: [Ergebnisse einer Studie zum Thema, mit welchem CSS-Framework am liebsten gearbeitet wird. Quelle: State of CSS 2023]
) <cluster-single-node>

Tailwind CSS wird verwendet, indem für jeden HTML-Komponenten ein Attribut "className" verwendet wird. Im className-Attribut werden dann die Stilisierungs-Optionen von Tailwind in beliebiger Reihenfolge gelistet. Diese können angepasst werden um das Desing des Komponenten im Browser zu verändern.

#figure(
  ```html
<footer className="bg-white w-full py-4 shadow-md mt-4">
  ```,
  caption: [Stilisierung eines Footer-Komponenten durch Tailwind CSS, Quelle: Eigene Darstellung],
)

== Building Tool: Vite
In der modernen Webentwicklung spielen Build-Tools eine entscheidende Rolle bei der Optimierung und Automatisierung des Entwicklungsprozesses. Diese Werkzeuge helfen Entwicklern dabei, den Code zu bündeln, zu komprimieren und zu transformieren. 

*Vite* ist ein Frontend Building Tool, "das ein schnelleres und schlankeres Entwicklungserlebnis für moderne Webprojekte bieten soll" @Vite. Vite besteht aus zwei Komponenten: 

#list(
  [Einem Entwicklerserver, der unterschiedliche Features über native ES-Module bietet, wie z.B. schnelles Hot Module Replacement],
  [Ein Build-Befehl, der den JavaScript Modulbundler rollup.js verwendet, um hochoptimierte statische Assets für die Produktion zu produzieren]
)

Vite wurde ursprünglich für Vue.js entwickelt, unterstützt aber inzwischen eine Vielzahl von Frontend-Frameworks, einschließlich React. Dazu muss lediglich das Projekt mit dem Vite-Command erstellt werden:

#figure(
  ```bash
bun create vite webshop-app --template react
  ```,
  caption: [Erstellen eines Webshop-Projektes mit Vite und React über Bun, Quelle: Eigene Darstellung]
)

= Frontend Designentscheidungen

Für das Frontend mussten unterschiedliche Designentscheidungen getroffen werden.

#list(
  [Der Aufbau der Webseite und die Routing-Optionen],
  [Aufbau der unterschiedlichen Seiten],
  [Corporate Design des Webshops]
)

Für den Aufbau der Webseite und den Routing-Optionen wird ein Routing-Diagramm erstellt. Für den Aufbau der unterschiedlichen Seiten des Webshops verwenden wir mehrere Wireframes, die die wichtigen Unterseiten darstellen. Für das Corporate Design wird eine Farbpalette und ein Logo gewählt, mit welcher dann eine Seite beispielhaft als Prototyp entworfen wird. 

== Routing der Webseite

Die Webseite benötigt für die Erfüllung der geforderten Funktionalitäten folgende Seiten:
#list(
  [Startseite],
  [Anmelde- / Registrierungsbereich],
  [Waren-Browser mit Suchfunktion],
  [Einzelne Seite für jedes Produkt mit Details],
  [Warenkorb],
  [Checkout und Bestellung],
  [Benutzerprofil mit vergangenen Bestellungen],
  [Administratorbereich mit Kontrolle über Benutzerkonten und Produktstand]
)

Eine Sitemap dafür könnte wie folgt aussehen:

#figure(
  image("/paper/assets/sitemap.PNG"),
  caption: [Navigationsdiagramm des Webshops, Quelle: Eigene Darstellung]
)

Einzelne Striche bedeuten hier einseitige Navigation, doppelte Striche stellen Navigation in beide Richtungen dar. Die Startseite fungiert als zentraler Einstiegspunkt und als Wurzel aller Routen. Über eine Navigationsbar sollen direkt von der Startseite aus der Login/Register-Bereich (welcher über das Backend nach Kinde weitergeleitet wird, deshalb also nicht Teil des Frontend-Designs ist), das Benutzerprofil (inkl. Admin-Bereich für Administratoren), der Warenkorb und der Warenbrowser (inkl. Suchfunktion) über eine zentrale Navigationsleiste erreichbar sein. Unterpunkte wie einzelne Produktseiten und der Checkout-Bereich sind dann aus den ihnen zugehörigen Oberbereichen aufrufbar. Das Routing-Diagramm sieht wie folgt aus:
#figure(
  ```bash
  /
├── /products
│   └── /product/:id
├── /admin
│   ├── /admin/products
│   └── /admin/users
├── /user
├── /contact
├── /cart
└── /checkout
  ```,
  caption: [Routing-Diagramm des Webshops, Quelle: Eigene Darstellung]
)

== Wireframing
Als nächster Schritt wurden Wireframes für die unterschiedlichen Seiten der Webseite entworfen. Diese enthalten nur die grobe Struktur der Seite und können sich im Entwicklungsprozess verändern. Es soll lediglich ein Grundriss sein, welche Elemente verfügbar sein sollen.

Das Grundprinzip jeder Seite soll wie folgt aufgebaut sein: 
#list(
  [Eine Navigationsleiste mit wichtigen Icons und einer Suchleiste am oberen Ende der Seite],
  [Seiteninhalt in der Mitte der Seite],
  [Ein Fußzeile mit Kontaktdaten und wichtigen Links zu z.B. Social-Media Pages des Webshops]
)

=== Startseite / Landing Page

#figure(
  image("/paper/assets/wireframe_landing.PNG", width:50%),
  caption: [Wireframe der Startseite des Webshops, Quelle: Eigene Darstellung]
)
Die Startseite folgt dem Standard-Design des Webshops. Der Seiteninhalt besteht aus zwei Reihen an Produkten: Eine Reihe mit zufällig ausgewählten Angeboten, und eine Reihe mit zufällig ausgewählten Standardprodukten. Diese sollen den Nutzer bereits beim Betreten der Seite Möglichkeiten geben die Produktauswahl einzuschätzen und dazu verleiten auf eines der Produkte zu klicken. An der rechten Seite soll sich zusätzlich eine Leiste mit Produktkategorien befinden. Damit soll der Produktbrowser geöffnet werden, welcher dann nur Produkte einer bestimmten Kategorie anzeigt. 

Diese Anordnung an Komponenten sorgt für zwei Effekte:
#list(
  [Der Nutzer hat sofort einen Überblick über die verfügbaren Produkte und Produktkategorien],
  [Der Nutzer wird direkt gereizt, sich einige ausgewählte Produkte näher anzuschauen und diese gegebenenfalls in den Warenkorb zu legen]
)

Somit wird die Kundenbindung und der Umsatz des Webshops möglicherweise bereits durch das Design der Startseite gesteigert.

=== Waren Browser
#figure(
  image("/paper/assets/wireframe_product_browser.PNG", width:50%),
  caption: [Wireframe des Produkt-Browsers des Webshops, Quelle: Eigene Darstellung]
)
Der Produktbrowser folgt ebenfalls dem Standard-Design. Die Suchleiste der Navigationsleiste wird auch im Warenbrowser verwendet um nach Artikeln zu suchen. Die Suchergebnisse sollen in der Mitte der Seite angezeigt und aufgelistet werden. Jedes Produkt soll dabei eine klickbare Fläche darstellen, auf dem Name, Beschreibung und Preis des Produktes zu sehen sind. So wird der Nutzer direkt mit den wichtigsten Informationen zu jedem Produkt versorgt bevor es überhaupt angeklickt wird. Für den zusätzlichen Nutzerkomfort soll sich über den Produkten eine Filterleiste befinden. Hier kann der Nutzer die Produkte z.B. alphabetisch, nach Preis, oder nach verfügbarer Anzahl sortieren. 
#pagebreak()
=== Produktdetails
#figure(
  image("/paper/assets/wireframe_product_details.PNG", width:50%),
  caption: [Wireframe einer Produktseite des Webshops, Quelle: Eigene Darstellung]
)

Die Produktdetails werden angezeigt, nachdem der Nutzer auf eines der Produkte im Warenbrowser geklickt hat. Produkte im Webshop haben jeweils folgende Daten:
#list(
  [Einen Produktnamen],
  [Ein Produktbild (optional)],
  [Eine produktbeschreibung (optional)],
  [Einen Bestand (wie viele Produkte sind verfügbar)]
)

Das Produktbild wird, falls verfügbar, auf dieser Seite gerendert. Über den Button "In den Warenkorb" soll der Artikel direkt in den Warenkorb des Benutzers gelegt werden. Zusätzlich soll hier ein kleines Pop-Up Fenster erscheinen, welches die Aktion bestätigt. 

=== Warenkorb
#figure(
  image("/paper/assets/wireframe_cart.PNG", width:50%),
  caption: [Wireframe des Warenkorbs des Webshops, Quelle: Eigene Darstellung]
)
Der Warenkorb soll dem Nutzer einerseits zeigen, welche Produkte sich gerade im Warenkorb befinden, und gleichzeitig die Möglichkeit geben diese daraus wieder zu entfernen. Zusätzlich soll sich im Warenkorb eine Preiskalkulation befinden. Diese summiert die Preise der ausgewählten Produkte und zeigt dem Nutzer an, welcher Endpreis zu bezahlen ist.

#pagebreak()

=== Checkout
#figure(
  image("/paper/assets/wireframe_product_checkout.PNG", width:50%),
  caption: [Wireframe des Checkout-Bildschirms des Webshops, Quelle: Eigene Darstellung]
)
Der Checkout-Prozess ist der letzte Schritt vor dem Abschluss des Kaufs und umfasst mehrere wichtige Komponenten, die dem Nutzer eine reibungslose und transparente Abwicklung ermöglichen:

#list(
[Preisberechnung: Zeigt eine detaillierte Aufschlüsselung der Gesamtkosten inklusive Steuern und Versandkosten],
[Lieferadresse: Ermöglicht dem Nutzer, die Lieferadresse einzugeben oder zu ändern],
[Zahlungsoptionen: Bietet dem Nutzer verschiedene Zahlungsmethoden zur Auswahl],
[Buttons für Bestellen und Abbrechen: Ermöglichen dem Nutzer, den Kauf abzuschließen oder den Vorgang abzubrechen],
)
Zusätzlich sind auch hier die Standards vorhanden wie Kontaktdaten und eine Navigationsleiste.

=== Benutzerprofil
#figure(
  image("/paper/assets/wireframe_user.PNG", width:50%),
  caption: [Wireframe des Benutzerprofils des Webshops, Quelle: Eigene Darstellung]
)
Das Benutzerprofil listet die vergangenen Bestellungen des Benutzers auf, und soll dem Nutzer gleichzeitig die Möglichkeit geben, sich aus dem Account auszuloggen. 
Die Bestellungen werden als Liste dargestellt, mit einem Klick auf ein Element der Liste soll dann ein kleines Fenster geöffnet werden, welches die Details der Bestellung für den Nutzer darstellt. Dazu gehören:
#list(
  [Die Produkte in der Bestellung und deren Preis],
  [Der Gesamtpreis der Bestellung],
  [Die Lieferadresse der Bestellung],
  [Das Datum der Bestellung]
)
So kann der Nutzer bequem alle Details zu den vergangenen Bestellungen nachschauen.

=== Admin-Bereich
Der Admin-Bereich ist für den Webshop-Kunden unsichtbar, muss aber trotzdem eine effiziente Nutzung gewährleisten. Der Nutzer ist hierbei nicht der Webshop-Kunde sondern der Administrator des Webshops, welcher z.B. ein Beauftragter des Webshop-Unternehmens sein kann, der ein geringes technisches Verständnis hat. So muss auch der Admin-Bereich benutzerfreundlich sein. Der Administratorbereich soll über einen Klick auf die "Admin"-Schaltfläche der Navigationsleiste erreichbar sein. Diese Schaltfläche soll nur für verifizierte Administratoren nutzbar sein, und auch die beiden folgenden Seiten sollen nur diesen zugänglich sein.
#figure(
  image("/paper/assets/wireframe_admin_dashboard.PNG", width:50%),
  caption: [Wireframe des Adminbereiches für eine Übersicht des Webshops, Quelle: Eigene Darstellung]
)
Das Dashboard des Adminbereichs zeigt eine Liste der vergangenen Bestellungen an, sowie ein Umsatzdiagramm, das den Umsatz des Webshops über die letzten Tage visualisieren soll. Der Admin kann dann über zwei dedizierte Buttons entweder den Produktmanager oder den Accountmanager öffnen. Ebenfalls kann sich der Admin hier aus dem Administrator-Account ausloggen. 
#figure(
  image("/paper/assets/wireframe_admin_products.PNG", width:50%),
  caption: [Wireframe des Adminbereiches für Produktmanagement des Webshops, Quelle: Eigene Darstellung]
)
Der erste Unterteil des Adminbereiches ist für das Management von Produkten des Webshops zuständig. Der Admin kann durch eine Produktliste nach bestimmten Produkten suchen und diese aus dem Sortiment des Webshops löschen bzw. deren Lagerstand anpassen. Zusätzlich kann der Administrator durch den Button "Produkt hinzufügen" ein neues Produkt mit Name, Preis, Beschreibung, Bild und Lagerbestand dem Webshop hinzufügen. Ein Button für das Zurückkehren zum Admin-Dashboard ist ebenfalls verfügbar.

#figure(
  image("/paper/assets/wireframe_admin_users.PNG", width:50%),
  caption: [Wireframe des Adminbereiches für Accountmanagement des Webshops, Quelle: Eigene Darstellung]
)

Der zweite Unterteil des Adminbereiches ist für das Management von Accounts von Kunden des Webshops zuständig. Dem Admin wird eine Liste von allen Accounts präsentiert. Diese Accounts können dann über diese Liste gelöscht werden. Eine Rückkehr zum Dashboard ist auch hier über einen Button möglich. 
#pagebreak()
== Corporate Design

Ein Corporate Design stellt ein einheitliches Design eines Unternehmens dar, welches intern und extern verwendet wird. Jedes Corporate Design besteht aus drei Komponenten:
#list(
  [*Markenidentität*: Eigenschaften, die über das Corporate Design in Bezug auf das Unternehmen vermittelt werden sollen],
  [*Basiselemente*: Logo und Farben],
  [*Anwendungen*: Orte, an denen das Corporate Design vermittelt wird, z.B. die Homepage oder Social Media]
)@Corporate-Design

Diese drei Komponente sollen nun im Bezug auf den Webshop ermittelt werden.

=== Markenidentität
Wichtig für die Markenidentität ist, wofür die Marke stehen soll. Dabei soll die eigene Marke oft in drei Worten beschrieben werden. @Marke

Für den Webshop soll eine Marke mit folgenden Stichworten entwickelt werden:
#list(
  [*Modern*: Der Webshop soll so wirken, als ob er mit modernster Technologie modernste Produkte anbietet],
  [*Jung*: Der Webshop soll eine Zielgruppe von jungen Erwachsenen ansprechen],
  [*Unternehmerisch*: Der Webshop soll so wirken, als ob er von einem Team frischer und mutiger Unternehmer geleitet wird]
)
Mit solchen Schlagworten können nun die Basiselemente des Webshops entwickelt werden. 

=== Basiselemente
Die Basiselemente umfassen ein Logo und das Farbschema, das vom Team des Webshops verwendet werden soll. Da der Webshop bisher noch keinen Titel hat, soll hier auch ein potentieller Titel für das Unternehmen gewählt werden. 

Für einen Titel sollte eine Kombination aus zwei kurzen Worten gewählt werden, die den Schlagworten der Markenidentität entsprechen. Für das Brainstorming wurde hier die Hilfe einer generativen KI in Bezug genommen, welche mit folgendem Prompt unterschiedliche Namen generiert hat:

#figure(
  ```
  Generiere Namen für ein Unternehmen, das einen Webshop betreibt. Die Namen sollen zu folgender Markenidentität passen: Modern, Jung, Unternehmerisch
  ```,
  caption: [Verwendeter Prompt, um mit Hilfe von generativer KI einen Namen für den Webshop zu finden]
)
Dieser Prompt wurde mehreren KIs gestellt, darunter GPT-3.5, GPT-4o und GPT-4.
Mögliche Titel die in Frage kamen sind die folgenden:
#list(
  [NeoBazaar],
  [TrendFusion],
  [TrendVault],
  [UrbanPulse],
  [InnoTrade],
  [BrightLane]
)
Es wurde sich für den Namen *TrendVault* entschieden, da dieser einen interessanten und modernen Klang hat, und noch von keinem Unternehmen genutzt wird. Neben dem Namen wird oft auch eine Tagline verwendet, ein kurzer Satz, der sozusagen der "Slogan" des Unternehmens ist. Wiederum wurde generative KI herangezogen, um interessante Slogans zu kreiren. 
#figure(
  ```
  Generiere Slogans für ein Unternehmen, das einen Webshop betreibt. Die Namen sollen zu folgender Markenidentität passen: Modern, Jung, Unternehmerisch
  ```,
  caption: [Verwendeter Prompt, um mit Hilfe von generativer KI einen Slogan für den Webshop zu finden]
)
Mögliche Slogans die in Frage kommen wurden ausgewählt:
#list(
  [All the Hot Stuff],
  [The Future of Shopping],
  [Redefine Shopping],
  [Where Modern Living Begins],
  [Young and Bold]
)
Es wurde sich auf den Slogan *All The Hot Stuff* geeinigt. Dieser trägt junge und explosive Energie mit, und führt in Kombination zu dem Namen TrendVault dazu, dass das Unternehmen ein junges und modernes, und trotzdem unternehmerisches Image aufbauen kann.

Zusätzlich zu einem Namen und einer Tagline muss auch ein einprägsames Logo erstellt werden. Für das Design des Logos wurde der kostenlose Logo-Designer von FreeLogo Design verwendet @Logo. Für das Logodesign wurden unterschiedliche Presets auf der Webseite in Kombination mit dem Namen TrendVault und dem Slogan generiert und getestet. Folgende vier Presets wurden als finale Optionen herausgewählt:

#figure(
  (grid(
    columns: 2,
    gutter: 2mm,
    image("/paper/assets/trendvault.png"),
    image("/paper/assets/trendvault_2.png")
  ),
  grid(
    columns: 2,
    gutter: 2mm,
    image("/paper/assets/trendvault_3.png"),
    image("/paper/assets/trendvault_4.png")
  )).join(),
  caption: [Die vier finalen Logo-Designs mit unterschiedlichen Farbpaletten, Quelle: Eigene Darstellung]
)

Gleichzeitig wurde mit der Auswahl eines Logos auch die Farbpalette des Webshops ausgewählt. Die finale Entscheidung viel hier auf das Logo unten rechts. Der Lieferwagen in Kombination mit dem kompletten Haus, in angenehm blauen farben Farben ergibt zusammen mit dem orangenen Kontrast ein ideales junges, modernes und unternehmerisches Bild eines Webshops, welcher trendige Produkte an junge Erwachsene verkauft. Das Farbschema soll also aus folgenden Farben bestehen:

#list(
  [*Blaue* Komponente],
  [*Weiß* oder helle Hintergründe],
  [*Orange* Akzente und Highlights] 
)

#pagebreak()

=== Anwendungen

Damit das Corporate Design seine Wirkung auch erzielen kann, muss es angewendet werden. Dazu gehört die Auswahl der Elemente, die mit dem Corporate Design stilisiert werden. In dieser Studienarbeit wird nur ein Webshop entwickelt, weshalb keine weiteren externen Materialien wie Social Media Kanäle oder Werbematerial in das Corporate Design einbezogen werden müssen. Für den Webshop gelten folgende Designprinzipien, auf Grund des Corporate Designs:

#list(
  [Die HNavigationsleiste und die Fußleiste sollen in einem gräulichen Blauton gehalten werden],
  [Der Hintergrund des Webshops soll in einer leicht weiß-grauen Farbe gehalten werden],
  [Buttons sollen je nach Funktionalität in Blau (Bestätigung / Weiter) oder Orange (Abbruch / Zurück) gehalten werden]
)

Diese Designmerkmale und Prinzipien werden im nächsten Schritt verwendet um nichtfunktionale Prototypen der Webseite zu erstellen.

#pagebreak()

== Prototypen

Es werden Prototypen für mehrere Seiten erstellt, um das Design und die Struktur des Webshops zu testen. Dafür wird statisches HTML verwendet, welches später dynamisch mit Elementen aus dem Backend des Webshops gefüllt wird. 

=== Startseite und Navigationsleiste
#figure(
  image("/paper/assets/prototype_landing_page.PNG", width: 80%),
  caption: [Der Prototyp der Startseite, Quelle: Eigene Darstellung]
)

Die Startseite, momentan noch ohne Funktionalität, zeigt wie die Navigationsleiste und die Fußleiste zum Corporate Design passen. Es werden gedämpfte blau-grau Töne für die Farbgestaltung der beiden Leisten verwendet. Der Link zur Startseite wird durch ein Bild des Logos ohne Hintergrund und Schrift realisiert, während der Einkaufswagen durch ein SVG-Icon eines Einkaufwagens dargestellt wird. Andere Links wie z.B. der Produktbrowser oder eine Kontaktseite mit wichtigen Informationen, sowie der Adminbereich können über Textmenüs aufgerufen werden. Die Fußzeile enthält Kontaktinformationen, den Namen des Unternehmens, sowie Links zu fiktiven Social-Media Seiten des Unternehmens. Als Beispiele wurden hier die Plattformen Instagram, X (ehemals Twitter), und Facebook genommen, deren Logos in Schwarz-Weißen Versionen als Links fungieren um den unteren Bildschirmrand nicht mit Text zu überladen. 

Sobald sich der Nutzer einloggt soll sich das Aussehen der Navigationsleiste leicht ändern. Dazu wurde ein weiterer Prototyp der Navigationsleiste entwickelt.

#figure(
  image("/paper/assets/logged_in.PNG"),
  caption: [Rechter Teil der Navigationsleiste nach dem Einloggen, Quelle: Eigene Darstellung]
)
Ein eingeloggter Nutzer wird neben der Suchleiste nun einen Einkaufswagen und ein Nutzer-Icon sehen. Diese führen jeweils in den Einkaufswagen des Nutzers bzw. zu seinem Nutzerprofil. Der Login-Button wird hier durch einen Logout-Button ausgetauscht. Zusätzlich wird der eingeloggte Benutzer hier mit seinem Namen begrüßt, der beim Erstellen des Accounts angegeben wurde.

=== Produkt-Browser
#figure(
  image("/paper/assets/prototype_products.PNG"),
  caption: [Prototyp des Produkte-Browsers, Quelle: Eigene Darstellung]
)
Der Produkte Browser (hier gefüllt mit Testprodukten) zeigt alle Produkte in Viererreihen. Der Name des Produkts ist fett gedruckt, mit einer Beschreibung darunter. Der Preis sticht durch eine grüne Färbung hervor. Die Verfügbarkeit wird in geringerer Deckkraft daruntergeschrieben. Eine Option zum sortieren nach dem Alphabet und nach Preis befindet sich in der oberen rechten Ecke. Durch einen Klick auf ein Produkt wird man auf die gegebene Produktseite weitergeleitet. 
#pagebreak()
=== Produkt-Details
#figure(
  image("/paper/assets/prototype_product_page.PNG", width: 80%),
  caption: [Prototyp der Produkt-Details Seite, Quelle: Eigene Darstellung]
)
Die Produkt-Details werden simpel mitten auf der Seite angezeigt. Es wird ein Bild gerendert, der Name steht in größeren fett gedruckten Buchstaben im Blickmittelpunkt, und die Details werden in Schrift mit weniger Deckkraft darunter aufgelistet. Der Preis wird durch die grüne Färbung für den Nutzer hervorgehoben. Der "Add to cart"-Button ist ebenfalls grün hervorgehoben. Sobald der "Add to cart"-Button geklickt wird, soll ein Popup-Fenster erscheinen, dass den Nutzer nach der gewünschten Anzahl abfragt. Durch diesen Prototyp werden dem Nutzer die wichtigen Informationen direkt übermittelt, und er kann das Produkt direkt in beliebiger Anzahl (solange vorhanden) in den Einkaufswagen legen. 
#pagebreak()

=== Warenkorb
#figure(
  image("/paper/assets/prototype_cart.PNG", width: 80%),
  caption: [Prototyp des Warenkorbs Seite, Quelle: Eigene Darstellung]
)
Der Warenkorb (Hier so zugeschnitten, das Navigationsleiste und Fußleiste nicht im Bild sind) listet alle ausgewählten Produkte auf, und gibt dem Nutzer die Möglichkeit, über das rote "X" das Produkt aus dem Warenkorb zu entfernen. Der Gesamtpreis des Einkaufes wird ebenfalls angezeigt. Zusätzlich wird dem Nutzer die einzigartige Cart-ID angezeigt. Diese kann der Nutzer im Falle eines Fehlers oder Problems den Entwicklern mitteilen, damit diese möglichst effizient behoben werden können. Der grüne Checkout-Button leitet den Nutzer mit dem momentanen Einkaufswagen weiter zum Checkout-Bildschirm. 

#pagebreak()

=== Checkout
#figure(
  image("/paper/assets/prototype_checkout.PNG", width: 70%),
  caption: [Prototyp der Checkout Seite, Quelle: Eigene Darstellung]
)

Die Checkout-Seite gibt dem Nutzer auf der rechten Seite die Möglichkeit, seine Addressinformationen einzutragen. Auf der linken Seite wird erneut der komplette Einkauf aufgelistet, und der Gesamtpreis angezeigt. Zahlen kann der Nutzer mit dem Button "Pay with PayPal", welcher später mit der PayPal-API verknüpft werden soll. Zusätzlich soll der Bezahlvorgang erst gestartet werden können, wenn der Nutzer alle Informationen auf der rechten Seite ausgefüllt hat. Ansonsten soll ihn ein Pop-Up daran erinnern. 

== Fazit zum Design
Die Auswahl des Designs lief erfolgreich. Es wurde ein Routing-Konzept für den Webshop geschaffen und für jede Route bzw. Seite ein geeigneter Wireframe entworfen. Im Anschluss konnten aus diesen Wireframes nach praktischer Überdenkung statische Prototypen entwickelt werden, die nun in den nächsten Schritten durch Entwicklung des Frontends dynamisch mit Verbindungen zum Backend-Server zu einem voll funktionsfähigem Webshop ausgearbeitet werden können. 

= Integration des Frontend zum Backend-Server
Im folgenden Kapitel wird dokumentiert, wie aus dem Frontend die unterschiedlichen APIs aus dem Backend angesprochen werden. Dazu gehört der korrekte Aufbau der Requests sowie die Verarbeitung der Daten. 

== Produkte
=== Laden aller Produkte
Für die Produkte wird folgende API verwendet
#figure(
  ```
  GET /api/products
  ```
)
Die Produkte werden über eine GET-Request aus dem Backend gesammelt und durch das State-Management in React auf die products-Konstante gesetzt. Diese wird bei jedem Laden der Seite erneut mit den aktuellsten Produkten aus dem Backend aktualisiert. Zusätzlich wird ein Loading-Status verwaltet. Dieser kann auf der Seite einen Ladebalken anzeigen, wenn die Produkte noch nicht fertig aus dem Backend geladen wurden. So kann kommuniziert werden, dass es sich nicht um einen Fehler in der Applikation sondern um einen Ladevorgang handelt.
#figure(
  ```ts
const [products, setProducts] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  ```,
  caption: [Aktualisieren der Produkte aus dem Backend, Quelle: Eigene Darstellung]
)
Diese Funktion kann nun in jedem Komponenten wiederverwendet werden, der Produkte aus dem Backend aktualisieren soll. 

=== Laden von Produktdetails

Um die Produktdetails eines einzelnen Produktes zu laden, wird folgende API-verwendet:
#figure(
  ```
  GET /api/products/:id{[0-9]+}
  ```
)
Die API liefert alle Informationen zu einem Produkt, und wird wie folgt vom Frontend implementiert:
#figure(
  ```ts
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        if (data && data.product) {
          setProduct(data.product);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  ```,
  caption: [Laden der Produktdetails eines einzelnen Produktes über die API, Quelle: Eigene Darstellung]
)
Es wird anhand der Produkt-ID auf die korrekte API zugegriffen, und das Produkt wird über das React State-Management geladen. Hier wird ebenfalls eine Loading-Variable verwendet um im Frontend den Ladevorgang anzeigen zu können.

=== Hinzufügen eines Produktes

Um ein Produkt der Backend-Datenbank hinzuzufügen wird folgende API und Methode verwendet:
#figure(
  ```
  POST /api/product
  ```
)
Es wird die POST-Methode der Produkt-Route verwendet. Nach der API-Dokumentation benötigt ein Produkt einen Namen, einen Preis, eine Kategorien-ID, eine Anzahl, und optional eine Beschreibung und ein Bild. Das Hinzufügen wird folgendermaßen realisiert:
#figure(
  ```ts
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    productName: "",
    description: "",
    price: "",
    categoryID: 1,
    availability: 0,
    image: "",
  });

  useEffect(() => {
  const handleAddProduct = async () => {
      try {
        if (imageFile) {
          const base64Image = await convertToBase64(imageFile);
          newProduct.image = base64Image.split(",")[1]; // Remove the data URL prefix
        }

        const response = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setProducts([...products, data.result[0]]);

      } catch (error) {
        console.error("Error adding product:", error);
      }
    };
  }
  ```,
  caption: [Hinzufügen eines neuen Produktes über die POST-Methode der Produkte-API, Quelle: Eigene Darstellung]
)
Hier wird über das React State-Management ein neues Produkt erstellt und an die API übergeben. Dieses Produkt kann von den Elementen eines Komponenten verändert werden, zum Beispiel durch ein Form-Element im Admin-Bereich. Es wird zusätzlich zu den restlichen Produkteigenschaften überprüft ob ein Bild vorhanden ist, und dieses für die Datenbank im Backend in einen Base64-String umgewandelt. 

=== Ändern eines Produktes

Um ein Produkt zu ändern, muss die PUT-Methode des jeweiligen Produktes aufgerufen werden:
#figure(
  ```
  PUT /api/products/:id{[0-9]+}
  ```
)
Diese Methode wird dann aufgerufen, wenn einzelne Werte des Produktes geändert werden sollen, aber kein neues Produkt erstellt werden soll. So können z.B. über den Admin-Bereich Produkte editiert werden oder über die Bestellfunktion der Nutzer die Anzahl der Produkte die auf Lager sind reduziert werden. Hier ist die Funktion die für die aktualisierung des Lagerbestandes nach Kauf eines Produktes genutzt wird: 
#figure(
  ```ts
  await fetch(`http://localhost:5173/api/products/${product.productID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          availability: product.availability - quantity,
          id: product.productID,
          description: product.description,
          price: String(product.price),
          categoryID: product.categoryID,
          productName: product.productName,
        }),
      });
  ```
)
Hier wird die Verfügbarkeit des Produktes mit der vom Kunden bestellten Quantität reduziert und an das Backend weitergegeben, wo dann die Datenbank aktualisiert werden kann. Diese Request kann auch im Admin-Bereich für das Editieren von Produkten verwendet werden, dort wird allerdings nicht die Quantität automatisch reduziert.

== Nutzerinformationen
Manche Komponente benötigen Informationen über den aktuellen Nutzer. So soll zum Beispiel der Name des Nutzers ausgelesen werden, oder seine ID für weitere Requests an das Backend verwendet werden. Um Informationen über den aktuellen Nutzer zu erhalten wird folgende API verwendet:
#figure(
  ```
  GET /api/me
  ```
)
Diese API liefert den aktuellen Nutzer zurück, und kann wie folgt aus dem Frontend aufgerufen werden:
#figure(
  ```ts
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("/api/me");

        if (response.status === 401) {
          setUserID("0");
          return;
        }

        const data = await response.json();
        const user = data.user;
        setUserID(user.id);
      } catch (error) {
        console.error("Fehler beim Laden des Benutzers:", error);
      }
    };

    getUser();
  }, []);
  ```,
  caption: [Laden des Nutzers, Quelle: Eigene Darstellung]
)
Falls der Nutzer noch nicht eingeloggt ist, wird die API einen 401-Code zurückgeben, der Zugriff ist also nicht autorisiert. Ist der Nutzer eingeloggt, wird eine valide Nutzer-ID des aktuellen Nutzers zurückgegeben. Diese wird dann über das React-State Management gespeichert.

== Warenkorb
Die Erstellung und das Management des Warenkorbes wird beim ersten Laden der Startseite begonnen. Sobald sich ein Nutzer einloggt, wird überprüft, ob bereits ein Warenkorb für den Nutzer hinterlegt ist. Ansonsten wird ein neuer, dem Nutzer zugehöriger Warenkorb erstellt. Sollte eine 401 (Unauthorized) Antwort zurückgegeben werden, ist kein Nutzer eingeloggt und kein Warenkorb wird erstellt. Verwendet werden dafür die GET und POST Methoden der internen Warenkorb-API:
#figure(
  ```
  POST /api/shoppingCart
  GET  /api/shoppingCart
  ```
)

= Finaler Webshop
== Features
Der fertig entwickelte Webshop bietet Kunden folgende Möglichkeiten:
#list(
  [*Anlegen* eines Benutzerkontos],
  [Artikel *anzeigen*, *suchen*, und dem *Warenkorb hinzufügen*],
  [Über den *Warenkorb* den Einkauf *prüfen*],
  [Über die *Kasse* die Produkte *bestellen*],
  [Über das Benutzerkonto die *Bestellhistorie einsehen*]
)
Zusätzlich wurden folgende Features für ein besseres Einkaufserlebnis hinzugefügt:
#list(
  [Möglichkeit, den Webshop ohne einen Account zu erkunden],
  [Anzeige von Produkten mit geringer Verfügbarkeit so wie zufälligen Produkten auf der Startseite (Product-Recommendations)],
)

Die Administratoren des Webshops haben folgende zusätzliche Rechte:
#list(
  [Artikel *hinzufügen* und *ändern*],
  [Warenbestand aller Artikel *anpassen*],
  [Benutzerkonten *verwalten* bzw. *löschen*],
  [Überblick auf letzte Bestellungen],
  [Überblick auf die Performance des Webshops in den letzten 10 Tagen durch ein *Sales Graph*]
)

== Finale Seiten-Designs
Im folgenden Abschnitt werden die endgültigen Designs der Seiten präsentiert, falls diese sich vom Wireframe bzw. Prototypen unterscheiden.
=== Startseite
#figure(
  image("/paper/assets/final_lp.PNG"),
  caption: [Endgültiges Design der Startseite mit Produktvorschlägen, Quelle: Eigener Webshop]
)
=== Admin-Bereich
#figure(
  image("/paper/assets/final_admin.PNG"),
  caption: [Endgültiges Design des Admin-Bereiches mit letzten Bestellungen und Sales Graph, Quelle: Eigener Webshop]
)