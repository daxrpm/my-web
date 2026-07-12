/**
 * Interface furniture: section headings, button labels, aria-labels. Not content — the
 * words Dax says about himself live in src/data/profile.ts. Both files are bilingual, but
 * they are edited by different people for different reasons, so they stay apart.
 */
import type { L } from './config';

export const ui = {
  nav: {
    links: [
      { href: '#work', label: { en: 'Work', es: 'Trayectoria' } as L },
      { href: '#projects', label: { en: 'Projects', es: 'Proyectos' } as L },
      { href: '#stack', label: { en: 'Stack', es: 'Stack' } as L },
      { href: '#about', label: { en: 'About', es: 'Sobre mí' } as L },
      { href: '#contact', label: { en: 'Contact', es: 'Contacto' } as L },
    ],
    themeToggle: { en: 'Switch theme', es: 'Cambiar tema' } as L,
    langToggle: { en: 'Ver en español', es: 'View in English' } as L,
    skipToContent: { en: 'Skip to content', es: 'Saltar al contenido' } as L,
  },

  hero: {
    primaryCta: { en: 'See the work', es: 'Ver el trabajo' } as L,
    secondaryCta: { en: 'Get in touch', es: 'Escríbeme' } as L,
  },

  work: {
    heading: { en: 'Work & research', es: 'Trayectoria e investigación' } as L,
    researchHeading: { en: 'Publications', es: 'Publicaciones' } as L,
  },

  education: {
    heading: { en: 'Education & certifications', es: 'Formación y certificaciones' } as L,
    certificate: { en: 'View certificate', es: 'Ver certificado' } as L,
  },

  activity: {
    heading: { en: 'GitHub activity', es: 'Actividad en GitHub' } as L,
    /** {total} and {days} are substituted at render time. */
    summary: {
      en: '<strong>{total} contributions</strong> in the last year, across <strong>{days} active days</strong>.',
      es: '<strong>{total} contribuciones</strong> en el último año, en <strong>{days} días activos</strong>.',
    } as L,
    graphLabel: {
      en: 'Contribution graph: {total} contributions in the last year',
      es: 'Gráfico de contribuciones: {total} contribuciones en el último año',
    } as L,
    less: { en: 'Less', es: 'Menos' } as L,
    more: { en: 'More', es: 'Más' } as L,
    months: {
      en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    } as L<string[]>,
    weekdays: {
      en: ['', 'Mon', '', 'Wed', '', 'Fri', ''],
      es: ['', 'Lun', '', 'Mié', '', 'Vie', ''],
    } as L<string[]>,
  },

  projects: {
    heading: { en: 'Selected work', es: 'Trabajo destacado' } as L,
    /** Keyed by Project['tag']. */
    tags: {
      infra: { en: 'Infrastructure', es: 'Infraestructura' } as L,
      systems: { en: 'Systems', es: 'Sistemas' } as L,
      research: { en: 'Scientific computing', es: 'Computación científica' } as L,
      ai: { en: 'AI / ML', es: 'IA / ML' } as L,
      backend: { en: 'Backend', es: 'Backend' } as L,
    },
    source: { en: 'Source', es: 'Código' } as L,
    live: { en: 'Live demo', es: 'Demo en vivo' } as L,
    updated: { en: 'updated {when}', es: 'actualizado {when}' } as L,
    ago: {
      today: { en: 'today', es: 'hoy' } as L,
      days: { en: '{n}d ago', es: 'hace {n}d' } as L,
      months: { en: '{n}mo ago', es: 'hace {n}m' } as L,
      years: { en: '{n}y ago', es: 'hace {n}a' } as L,
    },
    moreHeading: { en: 'Also on GitHub', es: 'También en GitHub' } as L,
    moreNote: {
      en: 'This list updates itself from the GitHub API.',
      es: 'Esta lista se actualiza sola desde la API de GitHub.',
    } as L,
    moreLink: {
      en: 'See all {count} repositories',
      es: 'Ver los {count} repositorios',
    } as L,
    openImage: { en: 'Open image: {alt}', es: 'Abrir imagen: {alt}' } as L,
    fullscreen: { en: 'Play video full screen', es: 'Ver el vídeo en pantalla completa' } as L,
    viewer: { en: 'Image viewer', es: 'Visor de imágenes' } as L,
    close: { en: 'Close image', es: 'Cerrar imagen' } as L,
  },

  stack: {
    heading: { en: 'Stack', es: 'Stack' } as L,
    languages: {
      en: 'Most-used languages across public repos',
      es: 'Lenguajes más usados en mis repos públicos',
    } as L,
  },

  about: {
    heading: { en: 'About', es: 'Sobre mí' } as L,
    faqHeading: { en: 'FAQ', es: 'Preguntas frecuentes' } as L,
  },

  contact: {
    heading: { en: 'Contact', es: 'Contacto' } as L,
  },

  /**
   * The consent notice. Umami is cookieless and self-hosted on Dax's own machine, so no law
   * strictly requires this — which is exactly why asking is worth something. The copy says
   * what is collected, where it goes, and that "no" costs the visitor nothing.
   */
  consent: {
    title: { en: 'A quick ask', es: 'Una pregunta rápida' } as L,
    body: {
      en: 'I care about privacy, so I will not measure anything without asking. If you allow it, I collect anonymous usage stats — which pages get read, which links get clicked — on analytics I host myself, on my own server. No cookies, no third parties, nothing sold, nothing that identifies you.',
      es: 'Me importa la privacidad, así que no mido nada sin preguntar. Si lo permites, recojo estadísticas de uso anónimas — qué se lee y qué se hace clic — en una herramienta que alojo yo mismo, en mi propio servidor. Sin cookies, sin terceros, sin vender nada y sin nada que te identifique.',
    } as L,
    accept: { en: 'Allow', es: 'Permitir' } as L,
    decline: { en: 'No thanks', es: 'No, gracias' } as L,
    /** The footer link that lets someone change their mind later. */
    manage: { en: 'Analytics preferences', es: 'Preferencias de analítica' } as L,
    label: { en: 'Analytics consent', es: 'Consentimiento de analítica' } as L,
  },

  texteller: {
    input: { en: 'Input', es: 'Entrada' } as L,
    output: { en: 'Output — LaTeX', es: 'Salida — LaTeX' } as L,
    rendered: { en: 'Rendered', es: 'Renderizado' } as L,
  },
};

/** Substitutes {placeholders}. A missing key stays visible, so a typo is obvious. */
export const fill = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (whole, key) => (key in vars ? String(vars[key]) : whole));
