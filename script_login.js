document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const passwordInput = document.getElementById("password");
        const password = passwordInput.value;

        // Создаём объект пользователя с тестовыми значениями
        const userData = {
            name: "Test User",
            email: email,
            password: password,
            age: 18,
            bio: "Пользователь платформы TeamUp!",
            skills: "Python, JS",
            avatar_path: "default_avatar.png"
        };

        try {
            const response = await fetch("https://e1f3-37-99-40-85.ngrok-free.app/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }

            const data = await response.json();

            if (data.message === "wrong password") {
                alert("Неверный пароль! Попробуйте снова.");
                passwordInput.value = "";  // Очищаем поле пароля
                passwordInput.focus();  // Устанавливаем фокус в поле ввода
                return;  // Прерываем выполнение, чтобы не перенаправлять
            }

            // Если всё в порядке, перенаправляем пользователя
            window.location.href = "https://lvgcb.github.io/social/";

        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
            alert("Ошибка при регистрации. Проверьте соединение с сервером.");
        }
    });
});
