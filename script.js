const commissionForm = {
  title: 'Commission request form',
  description:
    'Send the basic details for your request, references, and deadline through the commission form.',
  formUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSeZNxI-ys6OTB11PpYg_zNIrPovyF0K6e_3PGyi3f3oKuBGTQ/viewform',
  embedUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSeZNxI-ys6OTB11PpYg_zNIrPovyF0K6e_3PGyi3f3oKuBGTQ/viewform?embedded=true',
  embedHeight: 1378,
}

const galleryItems = [
  {
    title: 'Welcome back',
    description: '',
    image: 'gallery/cleaninnn.png',
    accent: 'accent-coral',
    categories: ['illustration', 'finished'],
  },
  {
    title: 'Lagtrain sketch',
    description: '',
    image: 'gallery/Illustration17(2).png',
    accent: 'accent-gold',
    categories: ['illustration', 'sketch'],
  },
  {
    title: 'Megumi Chibi',
    description: 'Shiki fanart',
    image: 'gallery/megumi chibi b.png',
    accent: 'accent-sky',
    categories: ['chibi', 'fanart'],
  },
  {
    title: 'Commission Sample Sheet',
    description:
      'Show commission examples, pricing samples, or a clean before-and-after workflow piece.',
    image: '',
    accent: 'accent-mint',
    categories: ['commission', 'reference'],
  },
]

// Example entry for new uploads:
// {
//   title: "New Piece",
//   description: "Short caption for the gallery card.",
//   image: "gallery/your-file-name.webp",
//   accent: "accent-sky",
//   categories: ["illustration", "commission"]
// }

const previewLimit = 4
const allCategory = 'all'

const formTitle = document.querySelector('#form-title')
const formDescription = document.querySelector('#form-description')
const formLink = document.querySelector('#form-link')
const formEmbedShell = document.querySelector('#form-embed-shell')
const formEmbed = document.querySelector('#form-embed')
const galleryPreview = document.querySelector('#gallery-preview')
const galleryFull = document.querySelector('#gallery-full')
const galleryFilters = document.querySelector('#gallery-filters')
const lightbox = document.querySelector('#gallery-lightbox')
const lightboxImage = document.querySelector('#lightbox-image')
const lightboxTitle = document.querySelector('#lightbox-title')
const lightboxDescription = document.querySelector('#lightbox-description')
const lightboxClose = document.querySelector('#lightbox-close')
let activeCategory = allCategory

if (formTitle && formDescription && formLink) {
  formTitle.textContent = commissionForm.title
  formDescription.textContent = commissionForm.description

  if (commissionForm.formUrl) {
    formLink.href = commissionForm.formUrl
    formLink.textContent = 'Open commission request form'
  } else {
    formLink.removeAttribute('href')
    formLink.setAttribute('aria-disabled', 'true')
    formLink.textContent = 'Commission form coming soon'
  }

  if (commissionForm.embedUrl && formEmbedShell && formEmbed) {
    formEmbedShell.hidden = false
    formEmbed.src = commissionForm.embedUrl

    if (commissionForm.embedHeight) {
      const embedHeight = `${commissionForm.embedHeight}px`
      formEmbedShell.style.minHeight = embedHeight
      formEmbed.style.minHeight = embedHeight
    }
  }
}

function formatCategoryLabel(category) {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

function createGalleryCard(item, index, interactive) {
  const card = document.createElement(interactive ? 'button' : 'article')
  const baseClassName = `art-card ${item.accent || 'accent-sky'}`
  card.className = interactive
    ? `${baseClassName} art-card-button`
    : baseClassName

  if (interactive) {
    card.type = 'button'
    card.dataset.galleryIndex = String(index)
    card.setAttribute('aria-label', `Open ${item.title}`)
  }

  const media = document.createElement(item.image ? 'img' : 'div')
  media.className = 'art-swatch'

  if (item.image) {
    media.src = item.image
    media.alt = item.title
    media.loading = 'lazy'
  }

  const title = document.createElement('h3')
  title.textContent = item.title

  const description = document.createElement('p')
  description.textContent = item.description

  const body = document.createElement('div')
  body.className = 'art-card-copy'
  body.append(title, description)

  if (Array.isArray(item.categories) && item.categories.length > 0) {
    const chipRow = document.createElement('div')
    chipRow.className = 'art-card-tags'

    item.categories.forEach((category) => {
      const chip = document.createElement('span')
      chip.className = 'art-chip'
      chip.textContent = formatCategoryLabel(category)
      chipRow.append(chip)
    })

    body.append(chipRow)
  }

  card.append(media, body)
  return card
}

function renderGallery(container, items, interactive) {
  if (!container) {
    return
  }

  const cardEntries = items.map((item) => ({
    item,
    index: galleryItems.indexOf(item),
  }))

  container.replaceChildren(
    ...cardEntries.map(({ item, index }) =>
      createGalleryCard(item, index, interactive),
    ),
  )
}

function renderGalleryPreview() {
  renderGallery(
    galleryPreview,
    galleryItems.filter((item) => item.image).slice(0, previewLimit),
    false,
  )
}

function getVisibleGalleryItems() {
  const publicItems = galleryItems.filter((item) => item.image)

  if (activeCategory === allCategory) {
    return publicItems
  }

  return publicItems.filter((item) => item.categories?.includes(activeCategory))
}

function renderGalleryFull() {
  renderGallery(galleryFull, getVisibleGalleryItems(), true)
}

function renderCategoryFilters() {
  if (!galleryFilters) {
    return
  }

  const categories = [
    allCategory,
    ...new Set(galleryItems.flatMap((item) => item.categories || [])),
  ]

  const buttons = categories.map((category) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.className =
      category === activeCategory
        ? 'gallery-filter is-active'
        : 'gallery-filter'
    button.dataset.category = category
    button.textContent =
      category === allCategory ? 'All work' : formatCategoryLabel(category)
    button.setAttribute('aria-pressed', String(category === activeCategory))
    return button
  })

  galleryFilters.replaceChildren(...buttons)
}

function openLightbox(index) {
  if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxDescription) {
    return
  }

  const item = galleryItems[index]

  if (!item || !item.image) {
    return
  }

  lightboxImage.src = item.image
  lightboxImage.alt = item.title
  lightboxTitle.textContent = item.title
  lightboxDescription.textContent = item.description
  lightbox.showModal()
}

renderGalleryPreview()
renderCategoryFilters()
renderGalleryFull()

if (galleryFull) {
  galleryFull.addEventListener('click', (event) => {
    const trigger = event.target.closest('.art-card-button')

    if (!trigger) {
      return
    }

    openLightbox(Number(trigger.dataset.galleryIndex))
  })
}

if (galleryFilters) {
  galleryFilters.addEventListener('click', (event) => {
    const trigger = event.target.closest('.gallery-filter')

    if (!trigger) {
      return
    }

    activeCategory = trigger.dataset.category || allCategory
    renderCategoryFilters()
    renderGalleryFull()
  })
}

if (lightbox && lightboxClose) {
  lightboxClose.addEventListener('click', () => {
    lightbox.close()
  })

  lightbox.addEventListener('click', (event) => {
    const bounds = lightbox.getBoundingClientRect()
    const clickedBackdrop =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom

    if (clickedBackdrop) {
      lightbox.close()
    }
  })
}
