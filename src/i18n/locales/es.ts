export const es = {
  admin: {
    festivals: {
      title: "Festividades",
      addButton: "Añadir Festividad",
      searchPlaceholder: "Buscar festividades...",
      loading: "Cargando festividades...",
      noResults: "No se encontraron festividades que coincidan con tu búsqueda.",
      deleteConfirm: "¿Estás seguro de que quieres eliminar esta festividad?",
      deleteError: "Error al eliminar la festividad. Por favor, inténtalo de nuevo.",
      loadError: "Error al cargar las festividades. Por favor, inténtalo más tarde.",
      table: {
        headers: {
          name: "Nombre",
          location: "Ubicación",
          date: "Fecha",
          description: "Descripción",
          actions: "Acciones",
        },
        actions: {
          editTooltip: "Editar festividad",
          deleteTooltip: "Eliminar festividad",
        },
      },
    },
    editFestival: "Editar Festividad",
    addFestival: "Añadir Festividad",
    close: "Cerrar",
    submitFailed: "Error al enviar la festividad. Por favor, inténtalo de nuevo.",
    cancel: "Cancelar",
    submitting: "Enviando...",
    update: "Actualizar",
    create: "Crear",
    form: {
      name: "Nombre de la Festividad",
      location: "Ubicación",
      searchPlaceholder: "Buscar Ciudad o Pueblo",
      fromDate: "Fecha de inicio",
      toDate: "Fecha de fin",
      description: "Descripción",
      url: "Sitio web",
    },
  },
  about: {
    title: "Sobre Rituales de Invierno",
    why: {
      title: "¿Por qué Rituales de Invierno?",
      description:
        "Soy Micael, nacido y criado en Lazarim, un lugar donde el carnaval cobra vida de una manera única. Como hijo de esta tradición, desarrollé una pasión cada vez mayor por descubrir rituales similares a los de mi tierra natal. Me fascina no solo la riqueza cultural y simbólica de cada una de estas celebraciones, sino también la oportunidad de documentarlas a través de la fotografía, preservando así su esencia para las generaciones futuras. \nDurante mi viaje de descubrimiento, me di cuenta de que faltaba un espacio centralizado y de fácil acceso donde cualquiera pudiera descubrir cuándo y dónde tienen lugar estas festividades únicas. De esta necesidad y pasión nació la idea de crear esta plataforma. \nSiendo ingeniero de software, me di cuenta de que podía unir mis dos pasiones: la tecnología y las tradiciones populares, creando un espacio digital donde estas manifestaciones culturales puedan ser descubiertas, compartidas y preservadas de una manera simple y accesible para todos.",
    },
    mission: {
      title: "Misión",
      description:
        "La misión es identificar, mapear y registrar todas las celebraciones de invierno en la Península Ibérica, desde las antiguas fiestas paganas y rituales de carnaval hasta las manifestaciones de los caretos y enmascarados. Así ayudando a preservar este rico patrimonio cultural, garantizando el fácil descubrimiento de estos tipos de eventos.",
    },
    contribute: {
      title: "Cómo Contribuir",
      description:
        "Hay dos formas de contribuir a este proyecto de preservación cultural:",
      methods: [
        {
          title: "Conviértete en Colaborador",
          description:
            "Solicita una cuenta de acceso al sitio web y únete activamente a nuestra comunidad. Como colaborador, podrás añadir y editar información sobre festividades, manteniendo los registros actualizados y precisos.",
        },
        {
          title: "Comparte Información",
          description:
            "¿Prefieres contribuir de forma más directa? Puedes compartir información por correo electrónico o contactándome directamente en las redes sociales (@MicaelMCarvalho). Toda la información es valiosa para enriquecer este archivo vivo de nuestras tradiciones.",
        },
      ],
    },
    feedback: {
      title: "Comentarios",
      description:
        "Tus comentarios son esenciales para mejorar continuamente esta plataforma. ¿Tienes sugerencias, ideas o has identificado algo que podamos mejorar? Compártelo con nosotros a través de los canales de contacto disponibles. Juntos, podemos crear un recurso cada vez más valioso para la comunidad.",
    },
    support: {
      title: "Apoyo",
      description:
        "Los costes de mantenimiento y alojamiento de este sitio web están actualmente respaldados por Mirazal Unipessoal LDA, ya que cree en la importancia de preservar y promover nuestro patrimonio cultural.",
    },
  },
  header: {
    title: "Rituales de Invierno",
    heritage: "20+ Años de Patrimonio Cultural",
    nav: {
      interactiveMap: "Mapa Interactivo",
      nextEvents: "Próximos Eventos",
      about: "Sobre",
    },
    search: {
      placeholder: "Buscar tradiciones...",
      label: "Buscar",
    },
    social: {
      follow: "Síguenos en {{platform}}",
    },
    favorites: {
      label: "Favoritos",
    },
    account: {
      label: "Cuenta",
    },
    cart: {
      label: "Carrito de Compra",
    },
    menu: {
      toggle: "Alternar menú",
      label: "Menú",
    },
    language: {
      select: "Cambiar a {{language}}",
    },
  },
  home: {
    hero: {
      title: "Descubre los Rituales de Invierno",
      subtitle:
        "Explora las antiguas tradiciones y el fascinante patrimonio cultural de las festividades de invierno en Portugal y España.",
    },
    features: {
      interactiveMap: {
        title: "Mapa Interactivo",
        description: "Explora festividades por toda la Península Ibérica",
      },
      nextEvents: {
        title: "Próximos Eventos",
        description: "Descubre las próximas festividades y celebraciones",
      },
    },
    start_exploring: "Explorar",
  },
  footer: {
    about: {
      title: "Sobre",
      description:
        "Explorando el rico patrimonio cultural de las festividades de invierno en la Península Ibérica. Únete a nosotros en el descubrimiento de tradiciones antiguas, únicas y singulares.",
    },
    quickLinks: {
      title: "Enlaces Rápidos",
      map: "Mapa Interactivo",
      events: "Próximos Eventos",
      about: "Sobre Nosotros",
    },
    contact: {
      title: "Contacto",
      email: "contacto@rituaisdeinverno.pt",
    },
    copyright: "© {{year}} Rituales de Invierno. Todos los derechos reservados.",
    developedBy: "Desarrollado por Micael Carvalho ",
  },
  festivals: {
    title: "Próximas Festividades",
    loading: "Cargando próximas festividades...",
    noUpcoming: "No hay festividades programadas.",
    visitWebsite: "Visitar sitio web",
    happeningNow: "Ocurriendo ahora",
    dateRange: "{{fromDate}} - {{toDate}}",
    dateRangeUnique: "{{fromDate}}",
    errors: {
      loadError: "Error al cargar las festividades. Por favor, inténtalo más tarde.",
    },
    relative: {
      today: "Hoy",
      tomorrow: "Mañana",
      days: "En {{count}} días",
      weeks: "En {{count}} semanas",
      months: "En {{count}} meses",
      years: "En {{count}} años",
    },
  },
};
