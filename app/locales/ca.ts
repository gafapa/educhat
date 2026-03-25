import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

const ca: PartialLocaleType = {
  Title: "Edu Chat",
  Subtitle: "Models d'IA executant-se al navegador",
  WIP: "En construccio...",
  ChatItem: {
    ChatItemCount: (count: number) => `${count} missatges`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} missatges amb Edu Chat`,
    Actions: {
      ChatList: "Anar a la llista de xats",
      CompressedHistory: "Historic de memoria comprimit",
      Export: "Exportar tots els missatges com a Markdown",
      Copy: "Copiar",
      Play: "Reproduir",
      Stop: "Aturar",
      Retry: "Tornar-ho a provar",
      Delete: "Eliminar",
      Transcribing: "Transcrivint...",
      TranscribingFailed: "La transcripcio ha fallat",
      MicrophoneDenied: "Acces al microfon denegat",
      DownloadingModel: "Baixant el model Whisper...",
      LoadingModel: "Carregant el model...",
      Processing: "Processant...",
      Edit: "Editar",
      EditConversation: "Editar la conversa",
    },
    Rename: "Canviar el nom del xat",
    Typing: "Escrivint...",
    Input: (submitKey: string) => {
      let inputHints = `Escriu alguna cosa i prem ${submitKey} per enviar`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", prem Shift + Enter per fer un salt de linia";
      }
      return inputHints;
    },
    Send: "Enviar",
    Config: {
      Reset: "Restablir per defecte",
      SaveAs: "Desar prompts",
      Confirm: "Confirmar",
    },
  },
  Export: {
    Title: "Tots els missatges",
    Copy: "Copiar-ho tot",
    Download: "Baixar",
    MessageFromYou: "Missatge teu",
    MessageFromWebLLM: "Missatge d'Edu Chat",
  },
  Memory: {
    Title: "Historic de memoria",
    EmptyContent: "Encara no hi ha res.",
    Copy: "Copiar-ho tot",
    Send: "Enviar memoria",
    Reset: "Restablir la sessio",
    ResetConfirm:
      "En restablir s'esborrara l'historic actual de la conversa i la memoria historica. Segur que vols continuar?",
  },
  Home: {
    NewChat: "Xat nou",
    DeleteChat: "Confirmes que vols eliminar la conversa seleccionada?",
    DeleteToast: "Xat eliminat",
    Revert: "Revertir",
  },
  Settings: {
    Title: "Configuracio",
    SubTitle: "Totes les configuracions",
    Lang: {
      Name: "Language",
      All: "Tots els idiomes",
    },
    Avatar: "Avatar",
    STT: {
      Title: "Veu a text",
      SubTitle: "Configuracions de veu a text",
      Model: "Model Whisper",
      Language: "Idioma Whisper",
    },
    FontSize: {
      Title: "Mida de la lletra",
      SubTitle: "Ajustar la mida de la lletra del xat",
    },
    InjectSystemPrompts: {
      Title: "Injectar prompts de sistema",
      SubTitle: "Afegir forcosament un prompt global de sistema a cada peticio",
    },
    Update: {
      Version: (x: string) => `Versio: ${x}`,
      IsLatest: "Ultima versio",
      CheckUpdate: "Comprovar actualitzacions",
      IsChecking: "Comprovant actualitzacions...",
      FoundUpdate: (x: string) => `Nova versio trobada: ${x}`,
      GoToUpdate: "Actualitzar",
    },
    SendKey: "Tecla d'enviament",
    Theme: "Tema",
    TightBorder: "Vora ajustada",
    SendPreviewBubble: {
      Title: "Bombolla de vista previa",
      SubTitle: "Previsualitzar markdown a la bombolla",
    },
    Prompt: {
      Disable: {
        Title: "Desactivar l'autocomplecio",
        SubTitle: "Escriu / per activar l'autocomplecio",
      },
      List: "Llista de prompts",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} integrats, ${custom} definits per l'usuari`,
      Edit: "Editar",
      Modal: {
        Title: "Llista de prompts",
        Add: "Afegir-ne un",
        Search: "Cercar prompts",
        New: "Prompt buit",
        NewContent: "Contingut buit del prompt",
      },
      EditModal: {
        Title: "Editar prompt",
      },
    },
    HistoryCount: {
      Title: "Quantitat de missatges adjunts",
      SubTitle: "Nombre de missatges adjunts per peticio",
    },
    CompressThreshold: {
      Title: "Llindar de compressio de l'historic",
      SubTitle:
        "Es comprimira si la llargada dels missatges sense comprimir supera aquest valor",
    },
    Usage: {
      Title: "Saldo del compte",
      SubTitle(used: any, total: any) {
        return `Usat $${used}, subscripcio $${total}`;
      },
      IsChecking: "Comprovant...",
      Check: "Comprovar",
      NoAccess: "Introdueix la clau API per comprovar el saldo",
    },
    Model: "Model",
    Temperature: {
      Title: "Temperatura",
      SubTitle: "Un valor mes alt fa la sortida mes aleatoria",
    },
    MaxTokens: {
      Title: "Maxim de tokens",
      SubTitle: "Longitud maxima dels tokens d'entrada i generats",
    },
    PresencePenalty: {
      Title: "Penalitzacio de presencia",
      SubTitle:
        "Un valor mes alt augmenta la probabilitat de parlar de nous temes",
    },
    FrequencyPenalty: {
      Title: "Penalitzacio de frequencia",
      SubTitle:
        "Un valor mes alt redueix la probabilitat de repetir la mateixa linia",
    },
    CacheType: {
      Title: "Tipus de cache",
      SubTitle: "Usar IndexDB o Cache API per desar els pesos del model",
      Cache: "Cache",
      IndexDB: "Base de dades indexada",
    },
  },
  Store: {
    DefaultTopic: "Nova conversa",
    BotHello: "Hola! Com et puc ajudar avui?",
    Error: "Alguna cosa ha anat malament. Torna-ho a provar mes tard.",
    Prompt: {
      History: (content: string) =>
        "Aquest es un resum de l'historic del xat entre la IA i l'usuari: " +
        content,
      Topic:
        "Genera un titol de quatre o cinc paraules que resumeixi la conversa sense cap text extra ni puntuacio.",
      Summarize:
        "Resumeix la nostra conversa breument en 200 caracters o menys per usar-la com a recordatori futur.",
    },
  },
  Copy: {
    Success: "Copiat al porta-retalls",
    Failed: "La copia ha fallat, concedeix permis per accedir al porta-retalls",
  },
  Context: {
    Toast: (x: any) => `Amb ${x} prompts de sistema`,
    Edit: "Prompts de sistema i memoria",
    Add: "Afegir-ne un",
  },
  Plugin: {
    Name: "Plugin",
  },
  FineTuned: {
    Sysmessage: "Ets un assistent que",
  },
  NewChat: {
    Return: "Tornar",
    Skip: "Ometre",
    Title: "Tria una plantilla",
    SubTitle: "Comenca el xat amb una plantilla",
    More: "Trobar-ne mes",
    NotShow: "No tornar-ho a mostrar",
    ConfirmNoShow:
      "Confirmes que vols desactivar-ho? Ho podras activar mes tard a configuracio.",
  },
  UI: {
    Confirm: "Confirmar",
    Cancel: "Cancelar",
    Close: "Tancar",
    Create: "Crear",
    Edit: "Editar",
  },
  Exporter: {
    Model: "Model",
    Messages: "Missatges",
    Topic: "Tema",
    Time: "Hora",
  },
};

export default ca;
