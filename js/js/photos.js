document.addEventListener("DOMContentLoaded", function () {

    const photos = JSON.parse(
        localStorage.getItem("efnexus_custom_photos")
    ) || {};

    Object.entries(photos).forEach(([id, url]) => {

        const img = document.getElementById(id);

        if (img) {
            img.src = url;
        }

    });

});