const express = require("express");
const app = express();

app.use(express.json());

app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;

        let odd_numbers = [];
        let even_numbers = [];
        let alphabets = [];
        let special_characters = [];
        let sum = 0;

        data.forEach(item => {
            if (!isNaN(item)) {
                let num = parseInt(item);
                if (num % 2 === 0) even_numbers.push(item);
                else odd_numbers.push(item);
                sum += num;
            } else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
            } else {
                special_characters.push(item);
            }
        });

        // Concat string logic (reverse + alternating caps)
        let concat_string = data
            .filter(ch => /^[a-zA-Z]+$/.test(ch))
            .join("")
            .split("")
            .reverse()
            .map((ch, idx) => idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase())
            .join("");

        const response = {
            is_success: true,
            user_id: "aastha_baid_271104",
            email: "aastha.baid2022@vitstudent.ac.in",
            roll_number: "22BIT0069",
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(),
            concat_string
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
