import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

const es: PartialLocaleType = {
  Title: "Edu Chat",
  WIP: "En construcción...",
  ChatItem: {
    ChatItemCount: (count: number) => `${count} mensajes`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} mensajes con Edu Chat`,
    Actions: {
      ChatList: "Ir a la lista de chats",
      CompressedHistory: "Historial de memoria comprimido",
      Export: "Exportar todos los mensajes como Markdown",
      Copy: "Copiar",
      Play: "Reproducir",
      Stop: "Detener",
      Retry: "Reintentar",
      Delete: "Borrar",
      Transcribing: "Transcribiendo...",
      TranscribingFailed: "Falló la transcripción",
      MicrophoneDenied: "Acceso al micrófono denegado",
      DownloadingModel: "Descargando modelo Whisper...",
      LoadingModel: "Cargando modelo...",
      Processing: "Procesando...",
    },
    Rename: "Renombrar chat",
    Typing: "Escribiendo...",
    Input: (submitKey: string) => {
      var inputHints = `Escribe algo y presiona ${submitKey} para enviar`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", presiona Shift + Enter para nueva línea";
      }
      return inputHints;
    },
    Send: "Enviar",
    Config: {
      Reset: "Reset to Default",
    },
    Metrics: {
      Prefill: "Prellenado",
      Decode: "Decodificación",
      TokensPerSec: "tok/s",
    },
  },
  Export: {
    Title: "Todos los mensajes",
    Copy: "Copiar todo",
    Download: "Descargar",
    MessageFromYou: "Mensaje de ti",
    MessageFromWebLLM: "Mensaje de Edu Chat",
  },
  Memory: {
    Title: "Historial de memoria",
    EmptyContent: "Aún no hay nada.",
    Copy: "Copiar todo",
    Send: "Send Memory",
    Reset: "Reset Session",
    ResetConfirm:
      "Resetting will clear the current conversation history and historical memory. Are you sure you want to reset?",
  },
  Home: {
    NewChat: "Nuevo chat",
    DeleteChat: "¿Confirmar eliminación de la conversación seleccionada?",
    DeleteToast: "Chat Deleted",
    Revert: "Revert",
  },
  Settings: {
    Title: "Configuración",
    SubTitle: "Todas las configuraciones",

    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "Todos los idiomas",
    },
    Avatar: "Avatar",
    STT: {
      Title: "Voz a Texto",
      SubTitle: "Configuraciones de voz a texto",
      Model: "Modelo Whisper",
      Language: "Idioma Whisper",
    },
    InjectSystemPrompts: {
      Title: "Inyectar Prompts del Sistema",
      SubTitle:
        "Agregar forzosamente un prompt de sistema simulado de Edu Chat al comienzo de la lista de mensajes en cada solicitud",
    },
    Update: {
      Version: (x: string) => `Versión: ${x}`,
      IsLatest: "Última versión",
      CheckUpdate: "Buscar actualizaciones",
      IsChecking: "Buscando actualizaciones...",
      FoundUpdate: (x: string) => `Se encontró una nueva versión: ${x}`,
      GoToUpdate: "Actualizar",
    },
    SendKey: "Tecla de envío",
    Theme: "Tema",
    TightBorder: "Borde ajustado",
    SendPreviewBubble: {
      Title: "Enviar burbuja de vista previa",
      SubTitle: "Preview markdown in bubble",
    },
    Prompt: {
      Disable: {
        Title: "Desactivar autocompletado",
        SubTitle: "Escribe / para activar el autocompletado",
      },
      List: "Lista de autocompletado",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} incorporado, ${custom} definido por el usuario`,
      Edit: "Editar",
      Modal: {
        Title: "Prompt List",
        Add: "Add One",
        Search: "Search Prompts",
        New: "Prompt vacío",
        NewContent: "Contenido del prompt vacío",
      },
      EditModal: {
        Title: "Edit Prompt",
      },
    },
    HistoryCount: {
      Title: "Cantidad de mensajes adjuntos",
      SubTitle: "Número de mensajes enviados adjuntos por solicitud",
    },
    CompressThreshold: {
      Title: "Umbral de compresión de historial",
      SubTitle:
        "Se comprimirán los mensajes si la longitud de los mensajes no comprimidos supera el valor",
    },

    Usage: {
      Title: "Saldo de la cuenta",
      SubTitle(used: any, total: any) {
        return `Usado $${used}, subscription $${total}`;
      },
      IsChecking: "Comprobando...",
      Check: "Comprobar de nuevo",
      NoAccess: "Introduzca la clave API para comprobar el saldo",
    },

    Model: "Modelo",
    Temperature: {
      Title: "Temperatura",
      SubTitle: "Un valor mayor genera una salida más aleatoria",
    },
    MaxTokens: {
      Title: "Máximo de tokens",
      SubTitle: "Longitud máxima de tokens de entrada y tokens generados",
    },
    PresencePenalty: {
      Title: "Penalización de presencia",
      SubTitle:
        "Un valor mayor aumenta la probabilidad de hablar sobre nuevos temas",
    },
    FrequencyPenalty: {
      Title: "Penalización de frecuencia",
      SubTitle:
        "Un valor mayor que disminuye la probabilidad de repetir la misma línea",
    },
    CacheType: {
      Title: "Tipo de caché",
      SubTitle: "Usar IndexDB o API de caché para guardar pesos del modelo",
      Cache: "Caché",
      IndexDB: "Base de datos Indexada",
    },
  },
  Store: {
    DefaultTopic: "Nueva conversación",
    BotHello: "¡Hola! ¿Cómo puedo ayudarte hoy?",
    Error: "Algo salió mal, por favor intenta nuevamente más tarde.",
    Prompt: {
      History: (content: string) =>
        "Este es un resumen del historial del chat entre la IA y el usuario como recapitulación: " +
        content,
      Topic:
        "Por favor, genera un título de cuatro a cinco palabras que resuma nuestra conversación sin ningún inicio, puntuación, comillas, puntos, símbolos o texto adicional. Elimina las comillas que lo envuelven.",
      Summarize:
        "Resuma nuestra discusión brevemente en 200 caracteres o menos para usarlo como un recordatorio para futuros contextos.",
    },
  },
  Copy: {
    Success: "Copiado al portapapeles",
    Failed:
      "La copia falló, por favor concede permiso para acceder al portapapeles",
  },
  Context: {
    Toast: (x: any) => `With ${x} system prompts`,
    Edit: "System and Memory Prompts",
    Add: "Add One",
  },
  Plugin: {
    Name: "Plugin",
  },
  FineTuned: {
    Sysmessage: "Eres un asistente que",
  },
  NewChat: {
    Return: "Return",
    Skip: "Skip",
    Title: "Pick a Template",
    SubTitle: "Start chat with a template",
    More: "Find More",
    NotShow: "Not Show Again",
    ConfirmNoShow: "Confirm to disable？You can enable it in settings later.",
  },

  UI: {
    Confirm: "Confirm",
    Cancel: "Cancel",
    Close: "Close",
    Create: "Create",
    Edit: "Edit",
  },
  Exporter: {
    Model: "Modelo",
    Messages: "Mensajes",
    Topic: "Tema",
    Time: "Time",
  },
};

es.Subtitle = "Modelos de IA ejecutandose en el navegador";

es.Chat = {
  ...es.Chat,
  EditMessage: {
    Title: "Editar todos los mensajes",
    Topic: {
      Title: "Tema",
      SubTitle: "Cambiar el tema actual",
    },
  },
  Actions: {
    ...es.Chat?.Actions,
    Share: "Compartir",
    Edit: "Editar",
    EditConversation: "Editar conversacion",
  },
  Commands: {
    new: "Iniciar un chat nuevo",
    newt: "Iniciar un chat nuevo con plantilla",
    next: "Siguiente chat",
    prev: "Chat anterior",
    clear: "Limpiar contexto",
    del: "Eliminar chat",
  },
  Roles: {
    System: "Prompt del sistema",
    Assistant: "Asistente",
    User: "Usuario",
  },
  InputActions: {
    Stop: "Detener",
    ToBottom: "Ir al ultimo",
    Theme: {
      auto: "Automatico",
      light: "Tema claro",
      dark: "Tema oscuro",
    },
    QuickPrompt: "Prompts rapidos",
    Clear: "Limpiar contexto",
    Settings: "Configuracion",
    UploadImage: "Subir imagenes",
  },
  Config: {
    ...es.Chat?.Config,
    Reset: "Restablecer por defecto",
    SaveAs: "Guardar prompts",
    Confirm: "Confirmar",
  },
  IsContext: "Prompt del sistema",
  Metrics: {
    Prefill: "Precarga",
    Decode: "Decodificacion",
    TokensPerSec: "tok/s",
  },
};

es.Export = {
  ...es.Export,
  Share: "Compartir",
  Format: {
    Title: "Formato de exportacion",
    SubTitle: "Markdown o imagen PNG",
  },
  IncludeContext: {
    Title: "Incluir contexto",
    SubTitle: "Exportar o no los prompts de contexto de la plantilla",
  },
  Steps: {
    Select: "Seleccionar",
    Preview: "Vista previa",
  },
  Image: {
    Toast: "Capturando imagen...",
    Modal: "Mantener pulsado o hacer clic derecho para guardar la imagen",
  },
};

es.Select = {
  Search: "Buscar",
  All: "Seleccionar todo",
  Latest: "Seleccionar ultimo",
  Clear: "Limpiar",
};

es.Memory = {
  ...es.Memory,
  Send: "Enviar memoria",
  Reset: "Restablecer sesion",
};

es.Home = {
  ...es.Home,
  DeleteToast: "Chat eliminado",
};

es.Settings = {
  ...es.Settings,
  Danger: {
    Reset: {
      Title: "Restablecer toda la configuracion",
      SubTitle: "Restablecer todos los ajustes a sus valores por defecto",
      Action: "Restablecer",
      Confirm: "Confirmar que quieres restablecer toda la configuracion?",
    },
    Clear: {
      Title: "Borrar todos los datos",
      SubTitle: "Borrar todos los mensajes y configuraciones",
      Action: "Borrar",
      Confirm:
        "Confirmar que quieres borrar todos los mensajes y configuraciones?",
    },
  },
  FontSize: {
    Title: "Tamano de fuente",
    SubTitle: "Ajustar el tamano de fuente del contenido del chat",
  },
  InputTemplate: {
    Title: "Plantilla de entrada",
    SubTitle: "El mensaje mas reciente se insertara en esta plantilla",
  },
  AutoGenerateTitle: {
    Title: "Generar titulo automaticamente",
    SubTitle:
      "Generar un titulo adecuado segun el contenido de la conversacion",
  },
  Template: {
    Builtin: {
      Title: "Ocultar plantillas integradas",
      SubTitle: "Ocultar las plantillas integradas en la lista de plantillas",
    },
  },
  THINKING: "Razonamiento",
  ContextWindowLength: {
    Title: "Tamano de ventana de contexto",
    SubTitle: "Numero maximo de tokens para la ventana de contexto",
  },
  TopP: {
    Title: "Top P",
    SubTitle: "No cambies este valor al mismo tiempo que la temperatura",
  },
  LogLevel: {
    Title: "Nivel de registro",
    SubTitle: "Ajustar el detalle que se muestra en la consola",
  },
  EnableThinking: {
    Title: "Activar razonamiento",
    SubTitle: "Permitir que los modelos razonen paso a paso",
  },
};

es.Download = {
  Success: "Contenido descargado en tu directorio.",
  Failed: "La descarga ha fallado.",
};

es.Context = {
  ...es.Context,
  Edit: "Prompts de sistema y memoria",
  Clear: "Contexto borrado",
  Revert: "Revertir",
};

es.Template = {
  Name: "Prompts",
  Page: {
    Title: "Biblioteca de prompts",
    SubTitle: "Coleccion guardada de prompts",
    Search: "Buscar prompts",
    Create: "Crear",
  },
  Item: {
    Info: (count: number) => `${count} prompts`,
    Chat: "Chat",
    View: "Ver",
    Edit: "Editar",
    Delete: "Eliminar",
    DeleteConfirm: "Confirmar eliminacion?",
  },
  EditModal: {
    Title: (readonly: boolean) =>
      `${readonly ? "Ver" : "Editar"} plantilla de prompt ${readonly ? "(solo lectura)" : ""}`,
    Save: "Guardar",
    Download: "Descargar",
    Clone: "Clonar",
  },
  Config: {
    Avatar: "Avatar del bot",
    Name: "Nombre del prompt",
    HideContext: {
      Title: "Ocultar prompts de contexto",
      SubTitle: "No mostrar los prompts de contexto en el chat",
    },
    Share: {
      Title: "Compartir esta plantilla",
      SubTitle: "Generar un enlace a esta plantilla",
      Action: "Copiar enlace",
    },
  },
};

es.NewChat = {
  ...es.NewChat,
  Return: "Volver",
  Skip: "Omitir",
  More: "Buscar mas",
  NotShow: "No mostrar de nuevo",
  ConfirmNoShow:
    "Confirmar que quieres desactivarlo? Podras activarlo mas tarde en configuracion.",
};

es.ModelSelect = {
  Title: "Seleccion de modelo",
  SearchPlaceholder: "Buscar modelo...",
};

es.UI = {
  ...es.UI,
  Confirm: "Confirmar",
  Cancel: "Cancelar",
  Close: "Cerrar",
  Create: "Crear",
  Edit: "Editar",
  Export: "Exportar",
  Import: "Importar",
  Sync: "Sincronizar",
  Config: "Configurar",
};

es.Exporter = {
  ...es.Exporter,
  Description: {
    Title:
      "Solo se mostraran los mensajes posteriores a la limpieza del contexto",
  },
  Time: "Hora",
};

es.URLCommand = {
  Code: "Se ha detectado un codigo de acceso en la URL. Confirmar aplicacion?",
  Settings: "Se ha detectado configuracion en la URL. Confirmar aplicacion?",
};

es.ServiceWorker = {
  Error:
    "El worker de WebLLM ha perdido la conexion. Cierra todas las pestanas de Edu Chat y vuelve a abrir la aplicacion.",
};

es.Memory = {
  ...es.Memory,
  ResetConfirm:
    "Restablecer borrara el historial actual de la conversacion y la memoria historica. Confirmas el restablecimiento?",
};

es.Home = {
  ...es.Home,
  Revert: "Restaurar",
};

es.Settings = {
  ...es.Settings,
  Lang: {
    ...es.Settings?.Lang,
    Name: "Idioma",
  },
  Avatar: "Imagen de perfil",
  SendPreviewBubble: {
    ...es.Settings?.SendPreviewBubble,
    SubTitle: "Previsualizar markdown en el globo",
  },
  Prompt: {
    ...es.Settings?.Prompt,
    Modal: {
      ...es.Settings?.Prompt?.Modal,
      Title: "Lista de prompts",
      Add: "Anadir",
      Search: "Buscar prompts",
    },
  },
};

es.Plugin = {
  ...es.Plugin,
  Name: "Complemento",
};

es.Template = {
  ...es.Template,
  Name: "Plantillas",
  Item: {
    ...es.Template?.Item,
    Chat: "Conversacion",
  },
};

es.NewChat = {
  ...es.NewChat,
  Title: "Elegir una plantilla",
  SubTitle: "Iniciar una conversacion con una plantilla",
};

export default es;
