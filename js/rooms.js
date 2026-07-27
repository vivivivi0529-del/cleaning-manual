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
        text: "501号室の完成状態を確認してください。",
        photos: []
      },

      notice: {
        title: "注意事項",
        text: "501号室の注意事項をここに入力してください。",
        photos: []
      },

      cleaning: {
        title: "清掃方法",
        text: "501号室の清掃方法をここに入力してください。",
        photos: []
      },

      bed: {
        title: "ベッドメイク",
        text: "501号室のベッドメイク方法をここに入力してください。",
        photos: []
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
    name: "ロビー",
    group: "共用部",
    sections: {}
  },

  "entrance": {
    name: "エントランス",
    group: "共用部",
    sections: {}
  },

  "terrace": {
    name: "テラス",
    group: "共用部",
    sections: {}
  },

  "corridor": {
    name: "中通路",
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
    label: "完成写真"
  },
  {
    key: "notice",
    label: "注意事項"
  },
  {
    key: "cleaning",
    label: "清掃方法"
  },
  {
    key: "bed",
    label: "ベッドメイク"
  },
  {
    key: "supplies",
    label: "備品配置"
  },
  {
    key: "equipment",
    label: "設備情報"
  },
  {
    key: "faq",
    label: "FAQ"
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