
//most views list
var most_views_list = document.getElementById("most-views-list");
fetch('/apis/mostviewsfilm')
    .then(response => {
        return response.json()
    }).then(data => {
        data.forEach(film => {
            var htmlstring = `<li class="category-item">
    <a href="/films/${film.slug}" class="category-item__link">
        <img src="${film.poster_link}" alt="" class="category-item__img">
        <div class="category-item-info">
            <h4 class=category-item-title>${film.movie_name_eng}</h4>
            <div class="category-item-views">${film.views} lượt xem</div>
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
        var notify_mobile = document.getElementById("header__notify-list-mobile");
        notify.innerHTML = ""
        notify_mobile.innerHTML = ""
        notifylist.slice(0, 6).forEach(noti => {
            var htmlstring = `<li class="header__notify-item">
                                <div class="header__notify-link">
                                    <img src="${noti.img}" class="header__notify-img">
                                    <div class="header__notify-info">
                                        <span class="header__notify-name">
                                        ${noti.info}</span>
                                    </div>
                                </div>
                            </li>`
            var htmlstring_mobile=`<li class="header__notify-item-mobile">
            <div class="header__notify-link-mobile">
                <img src="${noti.img}" class="header__notify-img-mobile">
                <div class="header__notify-info-mobile">
                ${noti.info}
                </div>
                </div>
            </li>`
            notify.innerHTML += htmlstring.trim();
            notify_mobile.innerHTML += htmlstring_mobile.trim();
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

            var htmlstring = `<div class="header__userinfo-username">${data.fullname}
                </div>
                                <div class="header__userinfo-userlevel">${data.username}`
            var htmlstring_mobile=`<div class="header__userinfo__mobile" >
            <img class="header__userinfo-logo__mobile" src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/design/discover/mascot-logo-design/mascot-logo-design_fb-img_1200x800.jpg"/>
            <div class="header__userinfo__mobile-box">
                <div class="header__userinfo__mobile-name">${data.fullname}</div>
                <div class="header__userinfo__mobile-username">${data.username}</div>
            </div>
            </div>`
            if (data.role === 'user') {
                htmlstring += `<form action="/user/history" method="GET">
                <button type="submit" class="header__userinfo-history">
                    Xem lịch sử
                </button></form>
                <form action="/user/manageaccount" method="GET">
                <button type="submit" class="header__userinfo-history">
                    Quản lí tài khoản
                </button></form>`
                htmlstring_mobile+=`<form action="/user/manageaccount" method="GET">
                <button type="submit" class="menubutton-mobile">
                Quản lí tài khoản
                </button>
                </form>
                <form action="/user/history" method="GET">
                            <button type="submit" class="menubutton-mobile">
                            Xem lịch sử
                            </button>
                        </form>`
            }
            else if (data.role == "admin") {
                htmlstring += `<form action="/user/managefilm" method="GET">
                <button type="submit" class="header__userinfo-history">
                                    Quản lí phim
                                </button></form>`;
                htmlstring_mobile+=`<form action="/user/managefilm" method="GET">
                <button type="submit" class="menubutton-mobile">
                Quản lí phim
                </button>
                </form>`
            }
            htmlstring += `<form action="/user/apis/logout" method="GET">
                                <button type="submit" class="header__userinfo-history">
                                    Đăng xuất
                                </button></form>`
            htmlstring_mobile+=`<form action="/user/apis/logout" method="GET">
            <button type="submit" class="menubutton-mobile">
            Đăng xuất
            </button>
            </form>`
            document.getElementById('header__userinfo').innerHTML += htmlstring;
            document.getElementById('header__userinfo-mobile').innerHTML += htmlstring_mobile;
            
        } else {
            document.getElementById('header__userinfo').innerHTML += `<div class="header__userinfo-username">Bạn chưa đăng nhập</div>`;
            document.getElementById('header__userinfo-mobile').innerHTML += `<div class="header__userinfo-username">Bạn chưa đăng nhập</div>`;
        }
    }).catch()

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


