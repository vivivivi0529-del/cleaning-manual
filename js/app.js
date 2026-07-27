/*
=========================================================
 HOTEL CLEANING MANUAL
 app.js
=========================================================
*/

document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     ELEMENTS
     ===================================================== */

  const sidebar = document.getElementById("sidebar");
  const menuBtn = document.getElementById("menuBtn");
  const menuOverlay = document.getElementById("menuOverlay");

  const roomList = document.getElementById("roomList");

  const roomTitle = document.getElementById("roomTitle");
  const roomName = document.getElementById("roomName");
  const roomCategory = document.getElementById("roomCategory");

  const sectionTitle = document.getElementById("sectionTitle");
  const photoGrid = document.getElementById("photoGrid");
  const manualText = document.getElementById("manualText");
  const manualTabsContainer = document.getElementById("manualTabs");
  const roomError = document.getElementById("roomError");


  /* =====================================================
     CURRENT ROOM
     URL例:
     room.html?room=501
     ===================================================== */

  const params = new URLSearchParams(window.location.search);
  const currentRoomId = params.get("room");
  const currentRoom = currentRoomId ? rooms[currentRoomId] : null;


  /* =====================================================
     GROUP ORDER
     ===================================================== */

  const groupOrder = [
    "500",
    "600",
    "700",
    "LOG",
    "共用部"
  ];


  /* =====================================================
     GROUP ROOMS
     ===================================================== */

  function getGroupedRooms() {

    const groups = {};

    groupOrder.forEach(function (group) {
      groups[group] = [];
    });

    Object.keys(rooms).forEach(function (roomId) {

      const room = rooms[roomId];

      if (!groups[room.group]) {
        groups[room.group] = [];
      }

      groups[room.group].push({
        id: roomId,
        data: room
      });

    });

    return groups;
  }


  const groupedRooms = getGroupedRooms();


  /* =====================================================
     SIDEBAR
     全ページ共通メニュー
     ===================================================== */

  function buildSidebar() {

    if (!sidebar) {
      return;
    }

    let html = "";

    html += `
      <a href="index.html" class="sidebar-home">
        ホーム
      </a>
    `;

    groupOrder.forEach(function (group) {

      const groupRooms = groupedRooms[group];

      if (!groupRooms || groupRooms.length === 0) {
        return;
      }

      html += `
        <div class="nav-group">
          <div class="nav-group-title">
            ${escapeHTML(group)}
          </div>

          <div class="nav-links">
      `;

      groupRooms.forEach(function (item) {

        const activeClass =
          currentRoomId === item.id
            ? " active"
            : "";

        html += `
          <a
            class="nav-link${activeClass}"
            href="room.html?room=${encodeURIComponent(item.id)}"
          >
            ${escapeHTML(item.data.name)}
          </a>
        `;

      });

      html += `
          </div>
        </div>
      `;

    });

    sidebar.innerHTML = html;
  }


  /* =====================================================
     MOBILE MENU
     ===================================================== */

  function openMenu() {

    if (sidebar) {
      sidebar.classList.add("open");
    }

    if (menuOverlay) {
      menuOverlay.classList.add("open");
    }

    document.body.style.overflow = "hidden";
  }


  function closeMenu() {

    if (sidebar) {
      sidebar.classList.remove("open");
    }

    if (menuOverlay) {
      menuOverlay.classList.remove("open");
    }

    document.body.style.overflow = "";
  }


  if (menuBtn) {

    menuBtn.addEventListener("click", function () {

      if (!sidebar) {
        return;
      }

      if (sidebar.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }

    });

  }


  if (menuOverlay) {

    menuOverlay.addEventListener("click", function () {
      closeMenu();
    });

  }


  if (sidebar) {

    sidebar.addEventListener("click", function (event) {

      const link = event.target.closest("a");

      if (!link) {
        return;
      }

      if (window.innerWidth <= 700) {
        closeMenu();
      }

    });

  }


  window.addEventListener("resize", function () {

    if (window.innerWidth > 700) {
      closeMenu();
    }

  });


  /* =====================================================
     HOME PAGE
     客室・エリア一覧
     ===================================================== */

  function buildHomePage() {

    if (!roomList) {
      return;
    }

    let html = "";

    groupOrder.forEach(function (group) {

      const groupRooms = groupedRooms[group];

      if (!groupRooms || groupRooms.length === 0) {
        return;
      }

      html += `
        <section class="floor-section">

          <h3 class="floor-title">
            ${escapeHTML(group)}
          </h3>

          <div class="room-grid">
      `;

      groupRooms.forEach(function (item) {

        html += `
          <a
            class="room-card"
            href="room.html?room=${encodeURIComponent(item.id)}"
          >
            ${escapeHTML(item.data.name)}
          </a>
        `;

      });

      html += `
          </div>
        </section>
      `;

    });

    roomList.innerHTML = html;
  }


  /* =====================================================
     ROOM PAGE
     ===================================================== */

  function buildRoomPage() {

    /*
      room.html以外ではroomNameが存在しないので
      何もしません。
    */

    if (!roomName) {
      return;
    }


    /*
      URLにroom指定がない、
      または存在しない部屋だった場合。
    */

    if (!currentRoom) {

      roomName.textContent = "ページが見つかりません";

      if (roomCategory) {
        roomCategory.textContent = "";
      }

      const manualCard = document.querySelector(".manual-card");

      if (manualCard) {
        manualCard.style.display = "none";
      }

      if (roomError) {

        roomError.hidden = false;

        roomError.innerHTML =
          '指定された客室・エリアが見つかりません。<br><a href="index.html">ホームへ戻る</a>';

      }

      return;
    }


    /*
      ページタイトル
    */

    document.title =
      currentRoom.name + " | ホテル客室マニュアル";


    if (roomTitle) {
      roomTitle.textContent = currentRoom.name;
    }


    roomName.textContent = currentRoom.name;


    if (roomCategory) {
      roomCategory.textContent = currentRoom.group;
    }


    /*
      タブを作成
    */

    buildManualTabs();


    /*
      最初は完成写真を表示
    */

    showSection("complete");

  }


  /* =====================================================
     MANUAL TABS
     ===================================================== */

  function buildManualTabs() {

    if (!manualTabsContainer) {
      return;
    }

    manualTabsContainer.innerHTML = "";

    manualTabs.forEach(function (tab, index) {

      const button = document.createElement("button");

      button.type = "button";
      button.className = "tab-button";
      button.dataset.section = tab.key;
      button.textContent = tab.label;

      if (index === 0) {
        button.classList.add("active");
      }

      button.addEventListener("click", function () {

        showSection(tab.key);

        const buttons =
          manualTabsContainer.querySelectorAll(".tab-button");

        buttons.forEach(function (item) {
          item.classList.remove("active");
        });

        button.classList.add("active");

      });

      manualTabsContainer.appendChild(button);

    });

  }


  /* =====================================================
     SHOW MANUAL SECTION
     ===================================================== */

  function showSection(sectionKey) {

    if (!currentRoom) {
      return;
    }

    const section =
      currentRoom.sections[sectionKey];


    if (!section) {

      if (sectionTitle) {
        sectionTitle.textContent = "";
      }

      if (manualText) {
        manualText.textContent = "情報が登録されていません。";
      }

      if (photoGrid) {
        photoGrid.innerHTML = "";
      }

      return;
    }


    /*
      セクションタイトル
    */

    if (sectionTitle) {
      sectionTitle.textContent = section.title;
    }


    /*
      説明文
    */

    if (manualText) {

      if (
        section.text !== undefined &&
        section.text !== null &&
        String(section.text).trim() !== ""
      ) {

        manualText.innerHTML =
          formatText(String(section.text));

      } else {

        manualText.textContent =
          "説明はまだ登録されていません。";

      }

    }


    /*
      写真
    */

    buildPhotos(section.photos);

  }


  /* =====================================================
     PHOTOS
     ===================================================== */

  function buildPhotos(photos) {

    if (!photoGrid) {
      return;
    }

    photoGrid.innerHTML = "";


    if (!Array.isArray(photos) || photos.length === 0) {
      return;
    }


    photos.forEach(function (photo, index) {

      /*
        文字列だけでも指定できます。

        photos: [
          "images/501/bed.jpg"
        ]

        または

        photos: [
          {
            src: "images/501/bed.jpg",
            alt: "ベッド完成状態"
          }
        ]
      */

      let src = "";
      let alt = "";


      if (typeof photo === "string") {

        src = photo;

        alt =
          currentRoom.name +
          " " +
          (sectionTitle ? sectionTitle.textContent : "") +
          " " +
          (index + 1);

      } else if (
        photo &&
        typeof photo === "object"
      ) {

        src = photo.src || "";

        alt =
          photo.alt ||
          currentRoom.name + " 写真 " + (index + 1);

      }


      if (!src) {
        return;
      }


      const img = document.createElement("img");

      img.src = src;
      img.alt = alt;
      img.className = "manual-photo";
      img.loading = "lazy";


      /*
        画像が存在しない場合、
        壊れた画像アイコンを残さない。
      */

      img.addEventListener("error", function () {
        img.remove();
      });


      photoGrid.appendChild(img);

    });

  }


  /* =====================================================
     TEXT FORMAT

     rooms.jsで改行すると、
     Webページでも改行して表示します。
     ===================================================== */

  function formatText(text) {

    return escapeHTML(text)
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\n/g, "<br>");

  }


  /* =====================================================
     HTML ESCAPE
     ===================================================== */

  function escapeHTML(value) {

    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  /* =====================================================
     INITIALIZE
     ===================================================== */

  buildSidebar();

  buildHomePage();

  buildRoomPage();

});