const express = require('express');
const users = require('./MOCK_DATA.json'); // Renamed to `users` to avoid conflict

const app = express();

app.get('/user', (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

// REST application
app.get('/api/user', (req, res) => {
    return res.json(users);
});

app
    .route("/api/user/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id); // Use `users` instead of `user`
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    })
    .patch((req, res) => {
        // edit  User using id
        res.json({ status: "panding" })
    })
    .delete((req, res) => {
        // delete  User using id 
        res.json({ status: "panding" })
    })

app.post("api/user", (req, res) => {
    // Create New User
    res.json({ status: "panding" })
})
// app.patch("api/user", (req, res) => {
        // edit  User using id
        // res.json({ status: "panding" })
// })
// app.delete("api/user", (req, res) => {
//     // delete  User
//     res.json({ status: "panding" })
// })

const port = 8000;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});