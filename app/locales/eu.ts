import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

const eu: PartialLocaleType = {
  Title: "Edu Chat",
  Subtitle: "Nabigatzailean exekutatzen diren IA ereduak",
  WIP: "Laster...",
  ChatItem: {
    ChatItemCount: (count: number) => `${count} mezu`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} mezu Edu Chat-ekin`,
    Actions: {
      ChatList: "Txat zerrendara joan",
      CompressedHistory: "Memoria historia konprimitua",
      Export: "Mezu guztiak Markdown gisa esportatu",
      Copy: "Kopiatu",
      Play: "Erreproduzitu",
      Stop: "Gelditu",
      Retry: "Berriz saiatu",
      Delete: "Ezabatu",
      Transcribing: "Transkribatzen...",
      TranscribingFailed: "Transkripzioak huts egin du",
      MicrophoneDenied: "Mikrofonoaren baimena ukatu da",
      DownloadingModel: "Whisper eredua jaisten...",
      LoadingModel: "Eredua kargatzen...",
      Processing: "Prozesatzen...",
      Edit: "Editatu",
      EditConversation: "Elkarrizketa editatu",
    },
    Rename: "Txataren izena aldatu",
    Typing: "Idazten...",
    Input: (submitKey: string) => {
      let inputHints = `Idatzi zerbait eta sakatu ${submitKey} bidaltzeko`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", sakatu Shift + Enter lerro berria egiteko";
      }
      return inputHints;
    },
    Send: "Bidali",
    Config: {
      Reset: "Lehenetsira berrezarri",
      SaveAs: "Promptak gorde",
      Confirm: "Berretsi",
    },
  },
  Export: {
    Title: "Mezu guztiak",
    Copy: "Dena kopiatu",
    Download: "Deskargatu",
    MessageFromYou: "Zure mezua",
    MessageFromWebLLM: "Edu Chat-en mezua",
  },
  Memory: {
    Title: "Memoria historia",
    EmptyContent: "Oraindik ez dago ezer.",
    Copy: "Dena kopiatu",
    Send: "Memoria bidali",
    Reset: "Saioa berrezarri",
    ResetConfirm:
      "Berrezartzeak uneko elkarrizketaren historia eta memoria historikoa ezabatuko ditu. Ziur zaude?",
  },
  Home: {
    NewChat: "Txat berria",
    DeleteChat: "Hautatutako elkarrizketa ezabatu nahi duzu?",
    DeleteToast: "Txata ezabatu da",
    Revert: "Leheneratu",
  },
  Settings: {
    Title: "Ezarpenak",
    SubTitle: "Ezarpen guztiak",
    Lang: {
      Name: "Language",
      All: "Hizkuntza guztiak",
    },
    Avatar: "Avatarra",
    STT: {
      Title: "Ahotsetik testura",
      SubTitle: "Ahotsetik testurako ezarpenak",
      Model: "Whisper eredua",
      Language: "Whisper hizkuntza",
    },
    FontSize: {
      Title: "Letra tamaina",
      SubTitle: "Txateko edukiaren letra tamaina doitu",
    },
    InjectSystemPrompts: {
      Title: "Sistemako promptak txertatu",
      SubTitle: "Eskaera bakoitzean sistemako prompt orokor bat txertatu",
    },
    Update: {
      Version: (x: string) => `Bertsioa: ${x}`,
      IsLatest: "Azken bertsioa",
      CheckUpdate: "Eguneratzea egiaztatu",
      IsChecking: "Eguneratzea egiaztatzen...",
      FoundUpdate: (x: string) => `Bertsio berria aurkitu da: ${x}`,
      GoToUpdate: "Eguneratu",
    },
    SendKey: "Bidaltzeko tekla",
    Theme: "Gaia",
    TightBorder: "Ertz estua",
    SendPreviewBubble: {
      Title: "Bidalketa aurrebista burbuila",
      SubTitle: "Markdown-a burbuilan aurreikusi",
    },
    Prompt: {
      Disable: {
        Title: "Autobetetzea desgaitu",
        SubTitle: "Idatzi / autobetetzea aktibatzeko",
      },
      List: "Prompt zerrenda",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} integratu, ${custom} erabiltzaileak sortuak`,
      Edit: "Editatu",
      Modal: {
        Title: "Prompt zerrenda",
        Add: "Bat gehitu",
        Search: "Promptak bilatu",
        New: "Prompt hutsa",
        NewContent: "Prompt hutsaren edukia",
      },
      EditModal: {
        Title: "Prompta editatu",
      },
    },
    HistoryCount: {
      Title: "Erantsitako mezu kopurua",
      SubTitle: "Eskaera bakoitzean eransten diren mezu kopurua",
    },
    CompressThreshold: {
      Title: "Historia konpresio atalasea",
      SubTitle:
        "Konprimitu egingo da konprimitu gabeko mezuen luzerak balioa gainditzen badu",
    },
    Usage: {
      Title: "Kontuaren saldoa",
      SubTitle(used: any, total: any) {
        return `Erabilita $${used}, harpidetza $${total}`;
      },
      IsChecking: "Egiaztatzen...",
      Check: "Egiaztatu",
      NoAccess: "Sartu API gakoa saldoa egiaztatzeko",
    },
    Model: "Eredua",
    Temperature: {
      Title: "Tenperatura",
      SubTitle: "Balio handiago batek ausazkoagoa egiten du irteera",
    },
    MaxTokens: {
      Title: "Gehieneko tokenak",
      SubTitle: "Sarrerako eta sortutako tokenen gehieneko luzera",
    },
    PresencePenalty: {
      Title: "Presentzia penalizazioa",
      SubTitle:
        "Balio handiago batek gai berriez hitz egiteko probabilitatea handitzen du",
    },
    FrequencyPenalty: {
      Title: "Maiztasun penalizazioa",
      SubTitle:
        "Balio handiago batek lerro bera errepikatzeko probabilitatea murrizten du",
    },
    CacheType: {
      Title: "Cache mota",
      SubTitle: "IndexDB edo Cache API erabili ereduaren pisuak gordetzeko",
      Cache: "Cache",
      IndexDB: "Indexatutako datu-basea",
    },
  },
  Store: {
    DefaultTopic: "Elkarrizketa berria",
    BotHello: "Kaixo! Nola lagun zaitzaket gaur?",
    Error: "Zerbait gaizki joan da. Saiatu berriro geroago.",
    Prompt: {
      History: (content: string) =>
        "Hau da IAren eta erabiltzailearen arteko txat historiaren laburpena: " +
        content,
      Topic:
        "Sortu lau edo bost hitzeko izenburu bat gure elkarrizketa laburbiltzeko, puntuaziorik edo testu gehigarririk gabe.",
      Summarize:
        "Laburbildu gure elkarrizketa 200 karaktere edo gutxiagotan etorkizuneko testuingururako.",
    },
  },
  Copy: {
    Success: "Arbelera kopiatuta",
    Failed: "Kopiak huts egin du, eman arbela erabiltzeko baimena",
  },
  Context: {
    Toast: (x: any) => `${x} sistemako promptekin`,
    Edit: "Sistema eta memoria promptak",
    Add: "Bat gehitu",
  },
  Plugin: {
    Name: "Plugina",
  },
  FineTuned: {
    Sysmessage: "Laguntzaile bat zara eta",
  },
  NewChat: {
    Return: "Itzuli",
    Skip: "Saltatu",
    Title: "Aukeratu txantiloi bat",
    SubTitle: "Hasi txata txantiloi batekin",
    More: "Gehiago aurkitu",
    NotShow: "Ez berriro erakutsi",
    ConfirmNoShow:
      "Ziur zaude desgaitu nahi duzula? Geroago ezarpenetan gaitu ahal izango duzu.",
  },
  UI: {
    Confirm: "Berretsi",
    Cancel: "Utzi",
    Close: "Itxi",
    Create: "Sortu",
    Edit: "Editatu",
  },
  Exporter: {
    Model: "Eredua",
    Messages: "Mezuak",
    Topic: "Gaia",
    Time: "Ordua",
  },
};

eu.Chat = {
  ...eu.Chat,
  EditMessage: {
    Title: "Mezu guztiak editatu",
    Topic: {
      Title: "Gaia",
      SubTitle: "Uneko gaia aldatu",
    },
  },
  Actions: {
    ...eu.Chat?.Actions,
    Share: "Partekatu",
  },
  Commands: {
    new: "Txat berri bat hasi",
    newt: "Txat berri bat hasi txantiloi batekin",
    next: "Hurrengo txata",
    prev: "Aurreko txata",
    clear: "Testuingurua garbitu",
    del: "Txata ezabatu",
  },
  Roles: {
    System: "Sistemako prompta",
    Assistant: "Laguntzailea",
    User: "Erabiltzailea",
  },
  InputActions: {
    Stop: "Gelditu",
    ToBottom: "Azken mezura",
    Theme: {
      auto: "Automatikoa",
      light: "Gai argia",
      dark: "Gai iluna",
    },
    QuickPrompt: "Prompt azkarrak",
    Clear: "Testuingurua garbitu",
    Settings: "Ezarpenak",
    UploadImage: "Irudiak igo",
  },
  IsContext: "Sistemako prompta",
  Metrics: {
    Prefill: "Aurre-karga",
    Decode: "Deskodetu",
    TokensPerSec: "tok/s",
  },
};

eu.Export = {
  ...eu.Export,
  Share: "Partekatu",
  Format: {
    Title: "Esportazio formatua",
    SubTitle: "Markdown edo PNG irudia",
  },
  IncludeContext: {
    Title: "Testuingurua sartu",
    SubTitle: "Txantiloiaren testuinguru promptak esportatu edo ez",
  },
  Steps: {
    Select: "Hautatu",
    Preview: "Aurrebista",
  },
  Image: {
    Toast: "Irudia hartzen...",
    Modal: "Luze sakatu edo eskuineko botoiaz egin klik irudia gordetzeko",
  },
};

eu.Select = {
  Search: "Bilatu",
  All: "Dena hautatu",
  Latest: "Azkena hautatu",
  Clear: "Garbitu",
};

eu.Settings = {
  ...eu.Settings,
  Danger: {
    Reset: {
      Title: "Ezarpen guztiak berrezarri",
      SubTitle: "Ezarpen guztiak lehenetsitako balioetara itzuli",
      Action: "Berrezarri",
      Confirm: "Ziur zaude ezarpen guztiak berrezarri nahi dituzula?",
    },
    Clear: {
      Title: "Datu guztiak ezabatu",
      SubTitle: "Mezu eta ezarpen guztiak ezabatu",
      Action: "Ezabatu",
      Confirm: "Ziur zaude mezu eta ezarpen guztiak ezabatu nahi dituzula?",
    },
  },
  InputTemplate: {
    Title: "Sarrerako txantiloia",
    SubTitle: "Azken mezua txantiloi honetan sartuko da",
  },
  AutoGenerateTitle: {
    Title: "Izenburua automatikoki sortu",
    SubTitle: "Elkarrizketaren arabera izenburu egoki bat sortu",
  },
  Template: {
    Builtin: {
      Title: "Txantiloi integratuak ezkutatu",
      SubTitle: "Ez erakutsi txantiloi integratuak zerrendan",
    },
  },
  THINKING: "Pentsamendua",
  ContextWindowLength: {
    Title: "Testuinguru leihoaren tamaina",
    SubTitle: "Testuinguru leihoaren gehieneko token kopurua",
  },
  TopP: {
    Title: "Top P",
    SubTitle: "Ez aldatu balio hau tenperaturarekin batera",
  },
  LogLevel: {
    Title: "Erregistro maila",
    SubTitle: "Kontsolan erakusten den xehetasun maila doitu",
  },
  EnableThinking: {
    Title: "Pentsamendua aktibatu",
    SubTitle: "Arrazoiketa ereduei pausoz pauso pentsatzen utzi",
  },
};

eu.Download = {
  Success: "Edukia zure direktorioan deskargatu da.",
  Failed: "Deskargak huts egin du.",
};

eu.Context = {
  ...eu.Context,
  Clear: "Testuingurua garbitu da",
  Revert: "Leheneratu",
};

eu.Template = {
  Name: "Promptak",
  Page: {
    Title: "Prompt liburutegia",
    SubTitle: "Gordetako prompt bilduma",
    Search: "Promptak bilatu",
    Create: "Sortu",
  },
  Item: {
    Info: (count: number) => `${count} prompt`,
    Chat: "Chat",
    View: "Ikusi",
    Edit: "Editatu",
    Delete: "Ezabatu",
    DeleteConfirm: "Ezabatzea berretsi?",
  },
  EditModal: {
    Title: (readonly: boolean) =>
      `${readonly ? "Ikusi" : "Editatu"} prompt txantiloia ${readonly ? "(irakurtzeko bakarrik)" : ""}`,
    Save: "Gorde",
    Download: "Deskargatu",
    Clone: "Klonatu",
  },
  Config: {
    Avatar: "Botaren avatarra",
    Name: "Promptaren izena",
    HideContext: {
      Title: "Testuinguruko promptak ezkutatu",
      SubTitle: "Ez erakutsi testuinguruko promptak txatean",
    },
    Share: {
      Title: "Txantiloi hau partekatu",
      SubTitle: "Txantiloi honetarako esteka sortu",
      Action: "Esteka kopiatu",
    },
  },
};

eu.ModelSelect = {
  Title: "Eredu hautaketa",
  SearchPlaceholder: "Bilatu eredua...",
};

eu.UI = {
  ...eu.UI,
  Export: "Esportatu",
  Import: "Inportatu",
  Sync: "Sinkronizatu",
  Config: "Konfiguratu",
};

eu.Exporter = {
  ...eu.Exporter,
  Description: {
    Title: "Testuingurua garbitu ondorengo mezuak bakarrik erakutsiko dira",
  },
};

eu.URLCommand = {
  Code: "URLan sarbide kode bat detektatu da. Aplikazioa baieztatu?",
  Settings: "URLan ezarpenak detektatu dira. Aplikazioa baieztatu?",
};

eu.ServiceWorker = {
  Error:
    "WebLLM workerrak konexioa galdu du. Itxi Edu Chat-eko fitxa guztiak eta ireki berriro aplikazioa.",
};

eu.Settings = {
  ...eu.Settings,
  Lang: {
    ...eu.Settings?.Lang,
    Name: "Hizkuntza",
  },
  CacheType: {
    ...eu.Settings?.CacheType,
    Cache: "Cachea",
  },
};

eu.Template = {
  ...eu.Template,
  Item: {
    ...eu.Template?.Item,
    Chat: "Elkarrizketa",
  },
};

export default eu;
