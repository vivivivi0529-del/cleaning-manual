document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.getElementById("sidebar");
    const roomList = document.getElementById("roomList");

    const groups = {};

    Object.entries(rooms).forEach(([id, room]) => {

        if (!groups[room.floor]) {
            groups[room.floor] = [];
        }

        groups[room.floor].push({
            id,
            ...room
        });

    });

    let menuHTML = "<h2>客室一覧</h2>";

    Object.keys(groups).forEach(floor => {

        menuHTML += `<h3>${floor}</h3><ul>`;

        groups[floor].forEach(room => {

            menuHTML += `
            <li>
                <a href="room.html?room=${room.id}">
                    ${room.name}
                </a>
            </li>`;

        });

        menuHTML += "</ul>";

    });

    sidebar.innerHTML = menuHTML;

    if(roomList){

        let html = "";

        Object.keys(groups).forEach(floor=>{

            html += `<section class="floor">`;

            html += `<h2>${floor}</h2>`;

            html += `<div class="room-grid">`;

            groups[floor].forEach(room=>{

                html += `
                <a class="room-card"
                href="room.html?room=${room.id}">
                ${room.name}
                </a>`;

            });

            html += `</div></section>`;

        });

        roomList.innerHTML = html;

    }

});