const express = require('express');

const app = express()
app.use(express.json())
const knex = require('knex')
    ({

        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: 'rexweb@123',
            database: 'employeeDB'
        }

    })


//schema for create table "student_marks"
knex.schema.hasTable('student_marks').then(function (exists) {
    if (!exists) {
        return knex.schema.createTable('student_marks', function (t) {
            t.increments('id').primary();
            t.string('math', 100);
            t.string('english', 100);
            t.string("science", 100)
            t.string("history", 100)
            // t.text('bio');
        });
    }
});



//schema for create table "student_details"
knex.schema.hasTable('student_details').then(function (exists) {
    if (!exists) {
        return knex.schema.createTable('student_details', function (t) {
            t.increments('id').primary();
            t.string('first_name', 100);
            t.string('last_name', 100);
            t.string("city", 100)
            t.string("country", 100)
            // t.text('bio');
        });
    }
});


// API for get data from "student_marks"
app.get("/student", (req, res) => {
    knex.select().table("student_marks").then((data) => {
        res.send(data)
    })
})


// API for insert data from "student_marks"
app.post("/student_info", (req, res) => {
    const data = {
        math: req.body.math,
        english: req.body.english,
        science: req.body.science,
        history: req.body.history,

    }
    res.send(data)
    knex("student_marks").insert(data).then(() => {
        console.log("data info insert success");
    }).catch((err) => {
        console.log(err);
    })
})

app.post("/student_details", (req, res) => {
    const data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        city: req.body.city,
        country: req.body.country,

    }
    res.send(data)
    knex("student_details").insert(data).then(() => {
        console.log("data info insert success");
    }).catch((err) => {
        console.log(err);
    })
})

app.get("/student-get", (req, res) => {
    knex.select().table("student_details").then((data) => {
        res.send(data)
    })
})

// API for update data from "student_marks"
app.patch("/student_upt/:id", (req, res) => {
    res.send(req.body)
    knex("student_marks").where('id', req.params.id).update(req.body).then(() => {
        console.log("data info updated success");
    }).catch((err) => {
        console.log(err);
    })
})


// API for delete data from "student_marks"
app.delete("/student_del/:id", (req, res) => {
    knex("student_marks").where('id', req.params.id).del().then(() => {
        res.send("data info del success");
    }).catch((err) => {
        console.log(err);
    })
})

// API for inner join 
app.post("/student_ijoin", (req, res) => {
    knex.select('*').from('student_marks').innerJoin('student_details', 'student_marks.id', 'student_details.id')
        .then((data) => {
            res.send(data)
            console.log(data);

        }).catch((err) => {
            console.log(err)
        })

})


//API for LeftJoin
app.post("/student_leftjoin", (req, res) => {
    knex.select('*').from('student_marks').leftJoin('student_details', 'student_marks.id', 'student_details.id')
        .then((data) => {
            res.send(data)
            console.log(data);

        }).catch((err) => {
            console.log(err)
        })

})


//API for right join
app.post("/student_rightjoin", (req, res) => {
    knex.select('*').from('student_marks').rightJoin('student_details', 'student_marks.id', 'student_details.id')
        .then((data) => {
            res.send(data)
            console.log(data);

        }).catch((err) => {
            console.log(err)
        })

})

app.listen(4000, () => {
    console.log(`Server is running at port: 4000 `)
})

