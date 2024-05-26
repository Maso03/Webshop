#let template(
  /// the title of your thesis
  /// type: str
  title: "Thesis Title",
  /// the subtitle, such as "Bachelor's Thesis", "T1000", "T2000" etc.
  /// type: str
  subtitle: "Bachelor's Thesis",
  /// list of author names
  /// type:array<str>
  authors: ("Author Name",),
  /// list of student ids relative to the authors
  student-ids: (1111111),
  /// date of submission
  /// type: datetime
  date: datetime(year: 1970, month: 1, day: 1),
  /// formatting template for the date
  /// type: str
  date-format: "[day].[month].[year]",
  /// List of logos to show at the top of the titlepage
  /// type: array<image>
  logos: (),
  /// Rest of the document
  /// type: content
  abstract: lorem(100),
  /// Dictionary of acronyms
  /// type: dictionary<str, str>
  body,
) = {
  set document(title: title, author: authors, date: date)

  set page(paper: "a4", margin: 2.5cm, numbering: "I")
  set pagebreak(weak: true)

  set text(size: 12pt, font: "CMU Sans Serif", lang: "de")
  set par(leading: 1em, justify: true)

  set list(indent: 0.75em)
  set enum(indent: 0.75em)

  set bibliography(title: "Quellverzeichnis")
  set outline(indent: auto, depth: 3, fill: repeat(" . "))

  show heading.where(level: 1): set block(above: 2em, below: 2em)
  show heading.where(level: 2): set block(above: 2em, below: 1.5em)
  show heading.where(level: 3): set block(above: 1.5em, below: 1em)

  show heading.where(level: 1): set text(size: 24pt)
  show heading.where(level: 2): set text(size: 20pt)
  show heading.where(level: 3): set text(size: 16pt)

  show heading: it => {
    if it.level == 1 { pagebreak() }
    if it.numbering == none { it } else {
      grid(
        columns: (auto, auto),
        box(width: 48pt, counter(heading).display()),
        it.body,
      )
    }
  }

  show bibliography: it => [#pagebreak() #it]
  show outline: it => [#pagebreak() #it]

  show outline.entry.where(level: 1): it => [
    #if it.element.func() != heading { return it }
    #show ".": ""
    #v(8pt) #strong(it)
  ]

  show raw.where(block: true): set align(left)
  show raw.where(block: true): set par(justify: false)
  show raw.where(block: true): set text(size: 8pt)

  show raw.where(block: true): set block(
    radius: 2pt,
    inset: 8pt,
    width: 100%,
    stroke: luma(128),
    fill: luma(240),
  )

  show raw.where(block: false): box.with(
    radius: 2pt,
    inset: (x: 3pt),
    outset: (y: 3pt),
    stroke: luma(128),
    fill: luma(240),
  )

  {
    set align(center + horizon)
    set page(numbering: none)
    set par(justify: false)

    pad(bottom: 64pt, stack(dir: ltr, spacing: 12em, ..logos))
    pad(bottom: 24pt, text(size: 20pt, strong(title)))

    text(size: 14pt, strong(subtitle))
    parbreak()

    v(12pt)
    [an der]
    parbreak()

    text(size: 14pt, strong[DHBW Stuttgart])
    parbreak()

    v(12pt)
    [von]
    parbreak()

    for (author, id) in authors.zip(student-ids) {
      text(size: 14pt, [#strong(author) (#id)])
      parbreak()
    }

    v(16pt)
    text(size: 14pt, strong(date.display(date-format)))
  }

  counter(page).update(1)

  {
    set align(horizon + center)
    set heading(outlined: false)
    heading(level: 2)[Abstract]
    abstract
    pagebreak()
  }

  outline()

  set heading(numbering: "1.1")
  set page(numbering: "1 / 1")
  counter(page).update(1)

  body
}