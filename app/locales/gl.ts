import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

const gl: PartialLocaleType = {
  Title: "Edu Chat",
  Subtitle: "Modelos de IA executándose no navegador",
  WIP: "En construción...",
  ChatItem: {
    ChatItemCount: (count: number) => `${count} mensaxes`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} mensaxes con Edu Chat`,
    Actions: {
      ChatList: "Ir á lista de chats",
      CompressedHistory: "Historial de memoria comprimido",
      Export: "Exportar todas as mensaxes como Markdown",
      Copy: "Copiar",
      Play: "Reproducir",
      Stop: "Deter",
      Retry: "Reintentar",
      Delete: "Eliminar",
      Transcribing: "Transcribindo...",
      TranscribingFailed: "Fallou a transcrición",
      MicrophoneDenied: "Acceso ao micrófono denegado",
      DownloadingModel: "Descargando modelo Whisper...",
      LoadingModel: "Cargando modelo...",
      Processing: "Procesando...",
    },
    Rename: "Renomear chat",
    Typing: "Escribindo...",
    Input: (submitKey: string) => {
      var inputHints = `Escribe algo e preme ${submitKey} para enviar`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", preme Shift + Enter para nova liña";
      }
      return inputHints;
    },
    Send: "Enviar",
    Config: {
      Reset: "Restablecer por defecto",
    },
    Metrics: {
      Prefill: "Pre-enche",
      Decode: "Decodificación",
      TokensPerSec: "tok/s",
    },
  },
  Export: {
    Title: "Todas as mensaxes",
    Copy: "Copiar todo",
    Download: "Descargar",
    MessageFromYou: "Mensaxe de ti",
    MessageFromWebLLM: "Mensaxe de Edu Chat",
  },
  Memory: {
    Title: "Historial de memoria",
    EmptyContent: "Aínda non hai nada.",
    Copy: "Copiar todo",
    Send: "Enviar memoria",
    Reset: "Restablecer sesión",
    ResetConfirm:
      "Ao restablecer borrarase o historial de conversas actual e a memoria histórica. Estás seguro de que queres restablecer?",
  },
  Home: {
    NewChat: "Novo chat",
    DeleteChat: "Confirmar a eliminación da conversa seleccionada?",
    DeleteToast: "Chat eliminado",
    Revert: "Reverter",
  },
  Settings: {
    Title: "Configuración",
    SubTitle: "Todas as configuracións",
    STT: {
      Title: "Voz a Texto",
      SubTitle: "Configuracións de voz a texto",
      Model: "Modelo Whisper",
      Language: "Idioma Whisper",
    },
    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "Todos os idiomas",
    },
    Avatar: "Avatar",
    FontSize: {
      Title: "Tamaño de fonte",
      SubTitle: "Axustar o tamaño de fonte do contido do chat",
    },
    InjectSystemPrompts: {
      Title: "Inxectar Prompts do Sistema",
      SubTitle:
        "Engadir forzosamente un prompt de sistema simulado de Edu Chat ao comezo da lista de mensaxes en cada solicitude",
    },
    Update: {
      Version: (x: string) => `Versión: ${x}`,
      IsLatest: "Última versión",
      CheckUpdate: "Buscar actualizacións",
      IsChecking: "Buscando actualizacións...",
      FoundUpdate: (x: string) => `Atopouse unha nova versión: ${x}`,
      GoToUpdate: "Actualizar",
    },
    SendKey: "Tecla de envío",
    Theme: "Tema",
    TightBorder: "Borde axustado",
    SendPreviewBubble: {
      Title: "Enviar burbulla de vista previa",
      SubTitle: "Vista previa de markdown na burbulla",
    },
    Prompt: {
      Disable: {
        Title: "Desactivar autocompletado",
        SubTitle: "Escribe / para activar o autocompletado",
      },
      List: "Lista de autocompletado",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} incorporado, ${custom} definido polo usuario`,
      Edit: "Editar",
      Modal: {
        Title: "Lista de Prompts",
        Add: "Engadir un",
        Search: "Buscar Prompts",
        New: "Prompt baleiro",
        NewContent: "Contido do prompt baleiro",
      },
      EditModal: {
        Title: "Editar Prompt",
      },
    },
    HistoryCount: {
      Title: "Cantidade de mensaxes adxuntas",
      SubTitle: "Número de mensaxes enviadas adxuntas por solicitude",
    },
    CompressThreshold: {
      Title: "Limiar de compresión de historial",
      SubTitle:
        "Comprimiranse as mensaxes se a lonxitude das mensaxes non comprimidas supera o valor",
    },

    Usage: {
      Title: "Saldo da conta",
      SubTitle(used: any, total: any) {
        return `Usado $${used}, subscrición $${total}`;
      },
      IsChecking: "Comprobando...",
      Check: "Comprobar de novo",
      NoAccess: "Introduza a clave API para comprobar o saldo",
    },

    Model: "Modelo",
    Temperature: {
      Title: "Temperatura",
      SubTitle: "Un valor maior xera unha saída máis aleatoria",
    },
    MaxTokens: {
      Title: "Máximo de tokens",
      SubTitle: "Longitud máxima de tokens de entrada e tokens xerados",
    },
    PresencePenalty: {
      Title: "Penalización de presenza",
      SubTitle:
        "Un valor maior aumenta a probabilidade de falar sobre novos temas",
    },
    FrequencyPenalty: {
      Title: "Penalización de frecuencia",
      SubTitle:
        "Un valor maior que diminúe a probabilidade de repetir a mesma liña",
    },
    CacheType: {
      Title: "Tipo de caché",
      SubTitle: "Usar IndexDB ou API de caché para gardar pesos do modelo",
      Cache: "Caché",
      IndexDB: "Base de datos Indexada",
    },
  },
  Store: {
    DefaultTopic: "Nova conversa",
    BotHello: "Ola! Como podo axudarche hoxe?",
    Error: "Algo saíu mal, por favor téntao de novo máis tarde.",
    Prompt: {
      History: (content: string) =>
        "Este é un resumo do historial do chat entre a IA e o usuario como recapitulación: " +
        content,
      Topic:
        "Por favor, xera un título de catro a cinco palabras que resuma a nosa conversa sen ningún inicio, puntuación, comiñas, puntos, símbolos ou texto adicional. Elimina as comiñas que o envolven.",
      Summarize:
        "Resume a nosa discusión brevemente en 200 caracteres ou menos para usalo como un recordatorio para futuros contextos.",
    },
  },
  Copy: {
    Success: "Copiado ao portapapeis",
    Failed:
      "A copia fallou, por favor concede permiso para acceder ao portapapeis",
  },
  Context: {
    Toast: (x: any) => `Con ${x} prompts de sistema`,
    Edit: "Prompts de Sistema e Memoria",
    Add: "Engadir un",
  },
  Plugin: {
    Name: "Plugin",
  },
  FineTuned: {
    Sysmessage: "Es un asistente que",
  },
  NewChat: {
    Return: "Volver",
    Skip: "Omitir",
    Title: "Escolle unha plantilla",
    SubTitle: "Comeza o chat cunha plantilla",
    More: "Atopar máis",
    NotShow: "Non ver de novo",
    ConfirmNoShow:
      "Confirmas que queres desactivalo? Podes activalo na configuración máis tarde.",
  },

  UI: {
    Confirm: "Confirmar",
    Cancel: "Cancelar",
    Close: "Pechar",
    Create: "Crear",
    Edit: "Editar",
  },
  Exporter: {
    Model: "Modelo",
    Messages: "Mensaxes",
    Topic: "Tema",
    Time: "Tempo",
  },
};

export default gl;
