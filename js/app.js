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
    "5F": "500",
    "6F": "600",
    "7F": "700",
    "LOG": "LOG",
    "共用部": "共用部"
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

          <div