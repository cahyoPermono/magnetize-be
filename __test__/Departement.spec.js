const request = require("supertest");
const app = require("../src/app");
const Departements = require("../src/departements/Departements");
const sequelize = require("../src/config/database");

beforeAll(() => {
  return sequelize.sync();
});

const validAnswer = {
  nama: "appDev_imani",
  url: "hr.co.id",
  industri: "human resource",
  lokasi: "jakarta",
  alamat: "jl. melati",
  deskripsi: "pppp",
  avatar: "https://faces-img.xcdn.link/image-lorem-face-3408.jpg",
};
const falseIdd = 1000030600;
let dummy_id = "";

describe("POST/ Submit Departement", () => {
  const postAnswer = (answer = validAnswer) => {
    return request(app).post("/api/1.0/departements").send(answer);
  };

  it("returns 200 OK when submit is valid", async () => {
    const response = await postAnswer();
    expect(response.status).toBe(200);
  });

  it("returns success message when submit is valid", async () => {
    const response = await postAnswer();
    console.log(response.body);
    expect(response.body.message).toBe("newDeparement_create_success");
  });

  it("save answer to databases", async () => {
    await postAnswer();
    const response = await Departements.findAll();
    expect(response.length).toBeGreaterThan(0);
  });

  it("save all input to databases", async () => {
    await postAnswer();
    const answerList = await Departements.findAll();
    const savedData = answerList[0];
    dummy_id = savedData.id;
    expect(savedData.nama).not.toBeNull();
    expect(savedData.url).not.toBeNull();
    expect(savedData.industri).not.toBeNull();
    expect(savedData.lokasi).not.toBeNull();
    expect(savedData.alamat).not.toBeNull();
  });
});

describe("GET/ All Departement", () => {
  const getAllDept = (answer = validAnswer) => {
    return request(app).get("/api/1.0/departements").send(answer);
  };

  it("returns 200 OK", async () => {
    const response = await getAllDept();
    expect(response.status).toBe(200);
  });

  it("returns all data and not null", async () => {
    const response = await getAllDept();
    expect(response.body).not.toBeNull();
    expect(response.body.departements.length >= 1).toBe(true);
  });
});

describe("GET/ One Departement", () => {
  const getOneDept = (answer = validAnswer) => {
    return request(app)
      .get("/api/1.0/departements/" + dummy_id)
      .send(answer);
  };
  const getOneDeptFalse = (answer = validAnswer, falseId = falseIdd) => {
    return request(app)
      .get("/api/1.0/departements/" + falseId)
      .send(answer);
  };

  it("returns 200 OK", async () => {
    const response = await getOneDept();
    expect(response.status).toBe(200);
  });

  it("returns one data and not null", async () => {
    const response = await getOneDept();
    expect(response.body.departements).not.toBeNull();
    expect(Object.keys(response.body).length === 1).toBe(true);
  });

  it("returns no data message when 'id' is not found", async () => {
    const response = await getOneDeptFalse();
    expect(response.body.message).toBe(`no data with id ${falseIdd} exist!`);
  });
});

describe("DEL/ a Departement", () => {
  const delOneDept = (answer = validAnswer) => {
    return request(app)
      .delete("/api/1.0/departements/" + dummy_id)
      .send(answer);
  };
  const delOneDeptFalse = (answer = validAnswer, falseId = falseIdd) => {
    return request(app)
      .get("/api/1.0/departements/" + falseId)
      .send(answer);
  };

  it("returns 200 OK and return message deleted", async () => {
    const response = await delOneDept();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`departement with id ${dummy_id} deleted`);
  });

  it("returns no data message after data is deleted", async () => {
    const response = await delOneDept();
    expect(response.body.message).toBe(`no data with id ${dummy_id} exist!`);
  });

  it("returns no data message when 'id' is not found", async () => {
    const response = await delOneDeptFalse();
    expect(response.body.message).toBe(`no data with id ${falseIdd} exist!`);
  });
});
