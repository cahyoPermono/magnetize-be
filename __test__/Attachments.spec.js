const request = require("supertest");
const app = require("../src/app");
const Attachments = require("../src/attachments/Attachments");
const sequelize = require("../src/config/database");

beforeAll(() => {
  return sequelize.sync();
});

const validAnswer = {
  attachment_name: "aaaaa",
  url: "https://www.google.com",
  DepartementId: "18",
};

const falseIdd = 1000030600;
let dummy_id = "";

describe("POST/ Submit Attachments", () => {
  const postAnswer = (answer = validAnswer) => {
    return request(app).post("/api/1.0/attachments").send(answer);
  };

  it("returns 200 OK when submit is valid", async () => {
    const response = await postAnswer();
    expect(response.status).toBe(200);
  });

  it("returns success message when submit is valid", async () => {
    const response = await postAnswer();
    expect(response.body.message).toBe("New_Attachment_create_success");
  });

  it("save answer to databases", async () => {
    await postAnswer();
    const response = await Attachments.findAll();
    expect(response.length).toBeGreaterThan(0);
  });

  it("save all input to databases", async () => {
    await postAnswer();
    const answerList = await Attachments.findAll();
    const savedData = answerList[0];
    dummy_id = savedData.id;
    expect(savedData.attachment_name).not.toBeNull();
    expect(savedData.url).not.toBeNull();
    expect(savedData.DepartementId).not.toBeNull();
  });
});

describe("GET/ All Attachments", () => {
  const getAllAttachments = (answer = validAnswer) => {
    return request(app).get("/api/1.0/attachments").send(answer);
  };

  it("returns 200 OK", async () => {
    const response = await getAllAttachments();
    expect(response.status).toBe(200);
  });

  it("returns all data and not null", async () => {
    const response = await getAllAttachments();
    expect(response.body).not.toBeNull();
    expect(response.body.attachments.length >= 1).toBe(true);
  });
});

describe("GET/ One Attachments", () => {
  const getOneAttachments = (answer = validAnswer) => {
    return request(app)
      .get("/api/1.0/attachments/" + dummy_id)
      .send(answer);
  };
  const getOneAttachmentsFalse = (answer = validAnswer, falseId = falseIdd) => {
    return request(app)
      .get("/api/1.0/attachments/" + falseId)
      .send(answer);
  };

  it("returns 200 OK", async () => {
    const response = await getOneAttachments();
    expect(response.status).toBe(200);
  });

  it("returns one data and not null", async () => {
    const response = await getOneAttachments();
    expect(response.body.attachments).not.toBeNull();
    expect(Object.keys(response.body).length === 1).toBe(true);
  });

  it("returns no data message when 'id' is not found", async () => {
    const response = await getOneAttachmentsFalse();
    expect(response.body.message).toBe(`no data with id ${falseIdd} exist!`);
  });
});

describe("GET/ Attachments by Dept", () => {
  const getAttachmentsbyDept = (answer = validAnswer) => {
    return request(app)
      .get("/api/1.0/attachments/dept/" + 18)
      .send(answer);
  };
  const getAttachmentsFalse = (answer = validAnswer, falseId = falseIdd) => {
    return request(app)
      .get("/api/1.0/attachments/dept/" + falseId)
      .send(answer);
  };

  it("returns 200 OK", async () => {
    const response = await getAttachmentsbyDept();
    expect(response.status).toBe(200);
  });

  it("returns data and not null", async () => {
    const response = await getAttachmentsbyDept();
    expect(response.body.notes).not.toBeNull();
    expect(Object.keys(response.body).length >= 1).toBe(true);
  });

  it("returns no data message when 'id' is not found", async () => {
    const response = await getAttachmentsFalse();
    expect(response.body.message).toBe(`no data with id ${falseIdd} exist!`);
  });
});

describe("DEL/ a Attachment", () => {
  const delOneAttachment = (answer = validAnswer) => {
    return request(app)
      .delete("/api/1.0/attachments/" + dummy_id)
      .send(answer);
  };
  const delOneAttachmentFalse = (answer = validAnswer, falseId = falseIdd) => {
    return request(app)
      .get("/api/1.0/attachments/" + falseId)
      .send(answer);
  };

  it("returns 200 OK and return message deleted", async () => {
    const response = await delOneAttachment();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Attachment with id = ${dummy_id} is deleted`);
  });

  it("returns no data message after data is deleted", async () => {
    const response = await delOneAttachment();
    expect(response.body.message).toBe(`no data with id ${dummy_id} exist!`);
  });

  it("returns no data message when 'id' is not found", async () => {
    const response = await delOneAttachmentFalse();
    expect(response.body.message).toBe(`no data with id ${falseIdd} exist!`);
  });
});
