var config = {
    films: {
        "HungerGames": new Film("Голодные игры", "FilmImages/HungerGames.jpg",2012, 12,
            7.2, 7.256, ["США"], ["Боевик", "Фантастика"]),
        "LordOfTheRing": new Film("Властелин колец: Возвращение короля",
            "FilmImages/LordOfTheRings.jpg", 2003, 12, 8.9, 8.626,
            ["США", "Новая Зеландия"], ["Фантастика", "Приключения"]),
        "HarryPotter": new Film("Гарри Поттер и философский камень", "FilmImages/HarryPotter.jpg",2001,
            12, 7.6, 8.2, ["Великобритания", "США"],
            ["Фантастика", "Приключения"])
    },

    categories: [
        new Category("Фантастика", ["HungerGames", "LordOfTheRing", "HarryPotter"]),
        new Category("Детектив", []),
        new Category("Боевик", ["HungerGames"]),
        new Category("Для детей", []),
        new Category("Комедия", []),
        new Category("Мелодрама", []),
        new Category("Приключения", ["LordOfTheRing", "HarryPotter"])
    ]
};

