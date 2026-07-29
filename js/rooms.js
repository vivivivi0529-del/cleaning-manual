/*
=========================================================
 HOTEL CLEANING MANUAL
 rooms.js

 このファイルだけで各客室・エリアの内容を管理します。
=========================================================
*/

const rooms = {

  /* =========================
     5F
     ========================= */

  "501": {
    name: "501号室",
    group: "5F",

    sections: {
      complete: {
  title: "完成写真",
  contents: [
    {
      text: "客室全体",
      photos: [
        "images/501/completed_1.HEIC"
      ]
    },
{
    text: "客室全体2",
    photos: [
        "images/501/completed_2.HEIC"
    ]
},
    {
      text: "バスルーム",
      photos: [
        "images/501/completed_3.HEIC"
      ]
    },
    {
      text: "洗面所",
      photos: [
        "images/501/completed_4.HEIC"
      ]
    },
    {
      text: "ベッド",
      photos: [
        "images/501/completed_5.HEIC"
      ]
    },
    {
      text: "トイレ",
      photos: [
        "images/501/completed_6.HEIC"
      ]
    }
  ]
},

      notice: {
        title: "注意事項",
        text: "501号室の注意事項をここに入力してください。",
        photos: []
      },
     cleaning: {
    title: "清掃方法",
    contents: [
        {
            text: " ",
            photos: [
                "images/501/cleaning_1.PNG"
            ]
        },
        {
            text: " ",
            photos: [
                "images/501/cleaning_2.PNG"
            ]
        },
        {
            text: " ",
            photos: [
                "images/501/cleaning_3.PNG"
            ]
        },
        {
            text: " ",
            photos: [
                "images/501/cleaning_4.PNG"
            ]
        },
        {
            text: " ",
            photos: [
                "images/501/cleaning_5.PNG"
            ]
        }
    ]
},
      bed: {
        title: "ベッドメイク",
        text: "画像だと分かりにくいので後に埋め込み動画にする予定。",
        photos: ["images/501/50BAEFF8-8E56-454F-8ECF-FCF2606BCF6C.png"]
      },

      supplies: {
        title: "備品配置",
        text: "501号室の備品配置をここに入力してください。",
        photos: []
      },

      equipment: {
        title: "設備情報",
        text: "501号室の設備情報をここに入力してください。",
        photos: []
      },

    }
  },


  "502": {
    name: "502号室",
    group: "5F",
    sections: {}
  },

  "505": {
    name: "505号室",
    group: "5F",
    sections: {}
  },

  "507": {
    name: "507号室",
    group: "5F",
    sections: {}
  },

  "508": {
    name: "508号室",
    group: "5F",
    sections: {}
  },

  "509": {
    name: "509号室",
    group: "5F",
    sections: {}
  },

  "510": {
    name: "510号室",
    group: "5F",
    sections: {}
  },


  /* =========================
     6F
     ========================= */

  "602": {
    name: "602号室",
    group: "6F",
    sections: {}
  },

  "603": {
    name: "603号室",
    group: "6F",
    sections: {}
  },

  "605": {
    name: "605号室",
    group: "6F",
    sections: {}
  },

  "607": {
    name: "607号室",
    group: "6F",
    sections: {}
  },

  "608": {
    name: "608号室",
    group: "6F",
    sections: {}
  },

  "609": {
    name: "609号室",
    group: "6F",
    sections: {}
  },

  "610": {
    name: "610号室",
    group: "6F",
    sections: {}
  },

  "611": {
    name: "611号室",
    group: "6F",
    sections: {}
  },


  /* =========================
     7F
     ========================= */

  "701": {
    name: "701号室",
    group: "7F",
    sections: {}
  },

  "704": {
    name: "704号室",
    group: "7F",
    sections: {}
  },

  "705": {
    name: "705号室",
    group: "7F",
    sections: {}
  },

  "708": {
    name: "708号室",
    group: "7F",
    sections: {}
  },

  "709": {
    name: "709号室",
    group: "7F",
    sections: {}
  },

  "710": {
    name: "710号室",
    group: "7F",
    sections: {}
  },

  "711": {
    name: "711号室",
    group: "7F",
    sections: {}
  },


  /* =========================
     LOG HOUSE
     ========================= */

  "loga": {
    name: "LOG A",
    group: "LOG",
    sections: {}
  },

  "logb": {
    name: "LOG B",
    group: "LOG",
    sections: {}
  },

  "logc": {
    name: "LOG C",
    group: "LOG",
    sections: {}
  },

  "logd": {
    name: "LOG D",
    group: "LOG",
    sections: {}
  },


  /* =========================
     共用部
     ========================= */

  "lobby": {
    name: "Lobby",
    group: "共用部",
    sections: {}
  },

  "entrance": {
    name: "Entrance",
    group: "共用部",
    sections: {}
  },

  "terrace": {
    name: "Terrace",
    group: "共用部",
    sections: {}
  },

  "corridor": {
    name: "corridor",
    group: "共用部",
    sections: {}
  }

};


/*
=========================================================
 共通タブ設定

 全客室・エリアで同じ順番に表示されます。
=========================================================
*/

const manualTabs = [
  {
    key: "complete",
    label: "完成写真",
    english: "Completed"
  },
  {
    key: "cleaning",
    label: "清掃方法",
    english: "Cleaning"
  },
  {
    key: "bed",
    label: "ベッドメイク",
    english: "Bed Making"
  },
  {
    key: "supplies",
    label: "備品配置",
    english: "Supplies"
  },
  {
    key: "notice",
    label: "注意事項",
    english: "Notes"
  },
  {
    key: "equipment",
    label: "設備情報",
    english: "Equipment"
  }
];


/*
=========================================================
 sections が空の部屋にも共通項目を自動設定

 これによって502以降も、何も追加しなくても
 501と同じタブ構成で表示できます。
=========================================================
*/

Object.keys(rooms).forEach(function(roomId) {

  const room = rooms[roomId];

  manualTabs.forEach(function(tab) {

    if (!room.sections[tab.key]) {

      room.sections[tab.key] = {
        title: tab.label,
        text: room.name + "の" + tab.label + "をここに入力してください。",
        photos: []
      };

    }

  });

});