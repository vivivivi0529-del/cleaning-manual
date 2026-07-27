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
     ===================================================== */

  const params = new URLSearchParams(window.location.search);

  const currentRoomId = params.get("room");

  const currentRoom =
    currentRoomId
      ? rooms[currentRoomId]
      : null;


  /* =====================================================
     GROUP ORDER
     ===================================================== */

  const groupOrder = [
    "5F",
    "6F",
    "7F",
    "LOG",
    "共用部"
  ];


  /* =====================================================
     GROUP DISPLAY NAMES

     rooms.js側は5F / 6F / 7Fのまま。
     画面上だけ500 / 600 / 700に変更します。
     ===================================================== */

  const groupLabels = {
    "5F": "500(main bild)",
    "6F": "600(annex)",
    "7F": "700(annex)",
    "LOG": "LOG",
    "共用部": "共用部(Common area)"
  };


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

      const displayGroup =
        groupLabels[group] || group;

      html += `
        <div class="nav-group">

          <div class="nav-group-title">
            ${escapeHTML(displayGroup)}
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

      const link =
        event.target.closest("a");

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
     ===================================================== */

  function buildHomePage() {

    if (!roomList) {
      return;
    }

    let html = "";


    groupOrder.forEach(function (group) {

      const groupRooms =
        groupedRooms[group];

      if (!groupRooms || groupRooms.length === 0) {
        return;
      }


      const displayGroup =
        groupLabels[group] || group;


      html += `
        <section class="floor-section">

          <h3 class="floor-title">
            ${escapeHTML(displayGroup)}
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

    if (!roomName) {
      return;
    }


    if (!currentRoom) {

      roomName.textContent =
        "ページが見つかりません";


      if (roomCategory) {
        roomCategory.textContent = "";
      }


      const manualCard =
        document.querySelector(".manual-card");


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


    /* ページタイトル */

    document.title =
      currentRoom.name +
      " | ホテル客室マニュアル";


    if (roomTitle) {
      roomTitle.textContent =
        currentRoom.name;
    }


    roomName.textContent =
      currentRoom.name;


    if (roomCategory) {

      roomCategory.textContent =
        groupLabels[currentRoom.group]
        || currentRoom.group;

    }


    buildManualTabs();

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
      button.innerHTML = `
  <span class="tab-ja">${escapeHTML(tab.label)}</span>
  <span class="tab-en">${escapeHTML(tab.english || "")}</span>
`;

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
     SHOW SECTION
     ===================================================== */

  function showSection(sectionKey) {

    if (!currentRoom) {
      return;
    }

    const section = currentRoom.sections[sectionKey];

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

    if (sectionTitle) {
      sectionTitle.textContent = section.title;
    }

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
          "　";

      }
    }

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

      } else if (photo && typeof photo === "object") {

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

      img.addEventListener("error", function () {
        img.remove();
      });

      photoGrid.appendChild(img);
    });
  }


  /* =====================================================
     TEXT FORMAT
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
