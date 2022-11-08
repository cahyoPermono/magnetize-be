const request = require("supertest");
const app = require("../src/app");
const Notes = require("../src/notes/Notes");
const sequelize = require("../src/config/database");

beforeAll(() => {
  return sequelize.sync();
});

const validAnswer = {
  notes:"makan",
  DepartementId: "18"
};

const falseIdd = 1000030600;
let dummy_id = "";

describe("POST/ Submit Notes", () => {
  const postAnswer = (answer = validAnswer) => {
    return request(app).post("/api/1.0/notes").send(answer);
  };

  it("returns 200 OK when submit is valid", async () => {
    const response = await postAnswer();
    expect(response.status).toBe(200);
  });

  it("returns success message when submit is valid", async () => {
    const response = await postAnswer();
    expect(response.body.message).toBe("newNotes_create_success");
  });

  it("save answer to databases", async () => {
    await postAnswer();
    const response = await Notes.findAll();
    expect(response.length).toBeGreaterThan(0);
  });

  it("save all input to databases", async () => {
    await postAnswer();
    const answerList = await Notes.findAll();
    const savedData = answerList[0];
    dummy_id = savedData.id;
    expect(savedData.note).not.toBeNull();
    expect(savedData.DepartementId).not.toBeNull();
  });
});

describe("GET/ All Notes", () => {
  const getAllNotes = (answer = validAnswer) => {
    return request(app).get("/api/1.0/notes").send(answer);
  };

  it("returns 200 OK", async () => {
    const response = await getAllNotes();
    expect(response.status).toBe(200);
  });

  it("returns all data and not null", async () => {
    const response = await getAllNotes();
    expect(response.body).not.toBeNull();
    expect(response.body.notes.length >= 1).toBe(true);
  });
});

describe("GET/ One Notes", () => {
  const getOneNotes = (answer = validAnswer) => {
    return request(app)
      .get("/api/1.0/notes/" + dummy_id)
      .send(answer);
  };
  const getOneNotesFalse = (answer = validAnswer, falseId = falseIdd) => {
    return request(app)
      .get("/api/1.0/notes/" + falseId)
      .send(answer);
  };

  it("returns 200 OK", async () => {
    const response = await getOneNotes();
    expect(response.status).toBe(200);
  });

  it("returns one data and not null", async () => {
    const response = await getOneNotes();
    expect(response.body.notes).not.toBeNull();
    expect(Object.keys(response.body).length === 1).toBe(true);
  });

  it("returns no data message when 'id' is not found", async () => {
    const response = await getOneNotesFalse();
    expect(response.body.message).toBe(`no data with id ${falseIdd} exist!`);
  });
});

describe("GET/ Notes by Dept", () => {
  const getNotesbyDept = (answer = validAnswer) => {
    return request(app)
      .get("/api/1.0/notes/dept/" + 18)
      .send(answer);
  };
  const getNotesFalse = (answer = validAnswer, falseId = falseIdd) => {
    return request(app)
      .get("/api/1.0/notes/dept/" + falseId)
      .send(answer);
  };

  it("returns 200 OK", async () => {
    const response = await getNotesbyDept();
    expect(response.status).toBe(200);
  });

  it("returns data and not null", async () => {
    const response = await getNotesbyDept();
    expect(response.body.notes).not.toBeNull();
    expect(Object.keys(response.body).length >= 1).toBe(true);
  });

  it("returns no data message when 'id' is not found", async () => {
    const response = await getNotesFalse();
    expect(response.body.message).toBe(`no data with id ${falseIdd} exist!`);
  });
});

describe("DEL/ a Notes", () => {
  const delOneNotes = (answer = validAnswer) => {
    return request(app)
      .delete("/api/1.0/notes/" + dummy_id)
      .send(answer);
  };
  const delOneNotesFalse = (answer = validAnswer, falseId = falseIdd) => {
    return request(app)
      .get("/api/1.0/notes/" + falseId)
      .send(answer);
  };

  it("returns 200 OK and return message deleted", async () => {
    const response = await delOneNotes();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`note with id = ${dummy_id} is deleted`);
  });

  it("returns no data message after data is deleted", async () => {
    const response = await delOneNotes();
    expect(response.body.message).toBe(`no data with id ${dummy_id} exist!`);
  });

  it("returns no data message when 'id' is not found", async () => {
    const response = await delOneNotesFalse();
    expect(response.body.message).toBe(`no data with id ${falseIdd} exist!`);
  });
});
