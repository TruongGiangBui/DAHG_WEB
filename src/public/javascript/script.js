
//most views list
var most_views_list = document.getElementById("most-views-list");
fetch('/apis/mostviewsfilm')
    .then(response => {
        return response.json()
    }).then(data => {
        data.forEach(film => {
            var htmlstring = `<li class="category-item">
    <a href="/films/`
                + film.slug
                + `" class="category-item__link">
        <img src="`
                + film.poster_link
                + `" alt="" class="category-item__img">
        <div class="category-item-info">
            <h4 class=category-item-title>`
                + film.movie_name_eng
                + `</h4>
            <div class="category-item-views">`
                + film.views + ` lượt xem</div>
        </div>
    </a>
</li>`

            most_views_list.innerHTML += htmlstring.trim();

        })
    }).catch(err => {
        console.log(err)
    })

//get notification
fetch('/user/apis/notification')
    .then(response => {
        return response.json();
    }).then(notifylist => {
        var notify = document.getElementById("header__notify-list");
        notify.innerHTML = ""
        notifylist.slice(0, 6).forEach(noti => {
            console.log(noti)
            var htmlstring = `<li class="header__notify-item">
                                <div class="header__notify-link">
                                    <img src="`
                + noti.img +
                `" class="header__notify-img">
                                    <div class="header__notify-info">
                                        <span class="header__notify-name">`
                + noti.info + `</span>
                                    </div>
                                </div>
                            </li>`
            notify.innerHTML += htmlstring.trim();
        })
    }).catch((err) => {
        console.log(err);
    })

//get userinfo
fetch("/user/apis/info")
    .then(response => {
        return response.json()
    }).then(data => {
        if (data.username) {

            var htmlstring = `<div class="header__userinfo-username">`
                + data.username +
                `</div>
                                <div class="header__userinfo-userlevel">`
                + data.role;

            if (data.role === 'user') {
                htmlstring += `<form action="/user/history" method="GET">
                <button type="submit" class="header__userinfo-history">
                    Xem lịch sử
                </button></form>`
            }
            else if (data.role == "admin") {
                htmlstring += `<form action="/user/managefilm" method="GET">
                <button class="header__userinfo-history">
                                    Quản lí phim
                                </button><button class="header__userinfo-history">
                                    Quản lí người dùng
                                </button></form>`;
            }
            htmlstring += `<form action="/user/apis/logout" method="GET">
                                <button type="submit" class="header__userinfo-history">
                                    Đăng xuất
                                </button></form>`
            document.getElementById('header__userinfo').innerHTML += htmlstring;
        } else {
            document.getElementById('header__userinfo').innerHTML += `<div class="header__userinfo-username">Bạn chưa đăng nhập</div>`;
        }
    }).catch(() => alert("Hãy đăng nhập"))

function viewNotify() {
        if (document.getElementsByClassName("header__notify")[0].style.display == "block") {
            document.getElementsByClassName("header__notify")[0].style.display = "none";
        }
        else {
            document.getElementsByClassName("header__notify")[0].style.display = "block";
        }
}
function showUserInfo() {
        if (document.getElementById("header__userinfo").style.display == "none") {
            document.getElementById("header__userinfo").style.display = "block";
        } else document.getElementById("header__userinfo").style.display = "none";
}


