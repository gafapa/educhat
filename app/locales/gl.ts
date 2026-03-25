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

gl.Chat = {
  ...gl.Chat,
  EditMessage: {
    Title: "Editar todas as mensaxes",
    Topic: {
      Title: "Tema",
      SubTitle: "Cambiar o tema actual",
    },
  },
  Actions: {
    ...gl.Chat?.Actions,
    Share: "Compartir",
    Edit: "Editar",
    EditConversation: "Editar conversacion",
  },
  Commands: {
    new: "Iniciar un chat novo",
    newt: "Iniciar un chat novo con plantilla",
    next: "Seguinte chat",
    prev: "Chat anterior",
    clear: "Limpar contexto",
    del: "Eliminar chat",
  },
  Roles: {
    System: "Prompt do sistema",
    Assistant: "Asistente",
    User: "Usuario",
  },
  InputActions: {
    Stop: "Deter",
    ToBottom: "Ir ao ultimo",
    Theme: {
      auto: "Automatico",
      light: "Tema claro",
      dark: "Tema escuro",
    },
    QuickPrompt: "Prompts rapidos",
    Clear: "Limpar contexto",
    Settings: "Configuracion",
    UploadImage: "Subir imaxes",
  },
  Config: {
    ...gl.Chat?.Config,
    SaveAs: "Gardar prompts",
    Confirm: "Confirmar",
  },
  IsContext: "Prompt do sistema",
  Metrics: {
    Prefill: "Precarga",
    Decode: "Decodificacion",
    TokensPerSec: "tok/s",
  },
};

gl.Export = {
  ...gl.Export,
  Share: "Compartir",
  Format: {
    Title: "Formato de exportacion",
    SubTitle: "Markdown ou imaxe PNG",
  },
  IncludeContext: {
    Title: "Incluír contexto",
    SubTitle: "Exportar ou non os prompts de contexto da plantilla",
  },
  Steps: {
    Select: "Seleccionar",
    Preview: "Vista previa",
  },
  Image: {
    Toast: "Capturando imaxe...",
    Modal: "Mantén pulsado ou fai clic dereito para gardar a imaxe",
  },
};

gl.Select = {
  Search: "Buscar",
  All: "Seleccionar todo",
  Latest: "Seleccionar ultimo",
  Clear: "Limpar",
};

gl.Settings = {
  ...gl.Settings,
  Danger: {
    Reset: {
      Title: "Restablecer toda a configuracion",
      SubTitle: "Restablecer todos os axustes aos valores por defecto",
      Action: "Restablecer",
      Confirm: "Confirmas que queres restablecer toda a configuracion?",
    },
    Clear: {
      Title: "Borrar todos os datos",
      SubTitle: "Borrar todas as mensaxes e configuracions",
      Action: "Borrar",
      Confirm:
        "Confirmas que queres borrar todas as mensaxes e configuracions?",
    },
  },
  InputTemplate: {
    Title: "Plantilla de entrada",
    SubTitle: "A mensaxe mais recente insertarase nesta plantilla",
  },
  AutoGenerateTitle: {
    Title: "Xerar titulo automaticamente",
    SubTitle: "Xerar un titulo axeitado segundo o contido da conversa",
  },
  Template: {
    Builtin: {
      Title: "Ocultar plantillas integradas",
      SubTitle: "Ocultar as plantillas integradas na lista de plantillas",
    },
  },
  THINKING: "Razoamento",
  ContextWindowLength: {
    Title: "Tamano da ventá de contexto",
    SubTitle: "Numero maximo de tokens para a ventá de contexto",
  },
  TopP: {
    Title: "Top P",
    SubTitle: "Non cambies este valor ao mesmo tempo ca temperatura",
  },
  LogLevel: {
    Title: "Nivel de rexistro",
    SubTitle: "Axustar o detalle que se mostra na consola",
  },
  EnableThinking: {
    Title: "Activar razoamento",
    SubTitle: "Permitir que os modelos razoen paso a paso",
  },
};

gl.Download = {
  Success: "Contido descargado no teu directorio.",
  Failed: "A descarga fallou.",
};

gl.Context = {
  ...gl.Context,
  Clear: "Contexto borrado",
  Revert: "Reverter",
};

gl.Template = {
  Name: "Prompts",
  Page: {
    Title: "Biblioteca de prompts",
    SubTitle: "Coleccion gardada de prompts",
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
      `${readonly ? "Ver" : "Editar"} plantilla de prompt ${readonly ? "(so lectura)" : ""}`,
    Save: "Gardar",
    Download: "Descargar",
    Clone: "Clonar",
  },
  Config: {
    Avatar: "Avatar do bot",
    Name: "Nome do prompt",
    HideContext: {
      Title: "Ocultar prompts de contexto",
      SubTitle: "Non mostrar os prompts de contexto no chat",
    },
    Share: {
      Title: "Compartir esta plantilla",
      SubTitle: "Xerar unha ligazon a esta plantilla",
      Action: "Copiar ligazon",
    },
  },
};

gl.ModelSelect = {
  Title: "Seleccion de modelo",
  SearchPlaceholder: "Buscar modelo...",
};

gl.UI = {
  ...gl.UI,
  Export: "Exportar",
  Import: "Importar",
  Sync: "Sincronizar",
  Config: "Configurar",
};

gl.Exporter = {
  ...gl.Exporter,
  Description: {
    Title: "So se mostraran as mensaxes posteriores a limpar o contexto",
  },
};

gl.URLCommand = {
  Code: "Detectouse un codigo de acceso na URL. Confirmas a aplicacion?",
  Settings: "Detectouse configuracion na URL. Confirmas a aplicacion?",
};

gl.ServiceWorker = {
  Error:
    "O worker de WebLLM perdeu a conexion. Pecha todas as pestanas de Edu Chat e volve abrir a aplicacion.",
};

gl.Settings = {
  ...gl.Settings,
  Lang: {
    ...gl.Settings?.Lang,
    Name: "Idioma",
  },
  Avatar: "Imaxe de perfil",
};

gl.Plugin = {
  ...gl.Plugin,
  Name: "Complemento",
};

gl.Template = {
  ...gl.Template,
  Name: "Plantillas",
  Item: {
    ...gl.Template?.Item,
    Chat: "Conversa",
  },
};

export default gl;
