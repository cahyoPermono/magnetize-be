const express = require("express");
const DepartementsService = require("./DepartementsService");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-creator-node');
const options = {
  formate: 'A3',
  orientation: 'portrait',
  border: '2mm',
  header: {
    height: '15mm',
    contents: '<h4 style=" color: red;font-size:20;font-weight:800;text-align:center;">CUSTOMER INVOICE</h4>'
  },
  footer: {
    height: '20mm',
    contents: {
      first: 'Cover page',
      2: 'Second page',
      default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
      last: 'Last Page'
    }
  }
}
const data = [
  {
    name: "Product 1",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ullam repudiandae provident, deleniti ratione ipsum sunt porro deserunt",
    unit: "pack",
    quantity: 2,
    price: 20,
    imgurl: "https://micro-cdn.sumo.com/image-resize/sumo-convert?uri=https://media.sumo.com/storyimages/ef624259-6815-44e2-b905-580f927bd608&hash=aa79d9187ddde664f8b3060254f1a5d57655a3340145e011b5b5ad697addb9c0&format=webp"
  },
  {
    name: "Product 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ullam repudiandae provident, deleniti ratione ipsum sunt porro deserunt",
    unit: "pack",
    quantity: 4,
    price: 80,
    imgurl: "https://micro-cdn.sumo.com/image-resize/sumo-convert?uri=https://media.sumo.com/storyimages/ef624259-6815-44e2-b905-580f927bd608&hash=aa79d9187ddde664f8b3060254f1a5d57655a3340145e011b5b5ad697addb9c0&format=webp"
  },
  {
    name: "Product 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ullam repudiandae provident, deleniti ratione ipsum sunt porro deserunt",
    unit: "pack",
    quantity: 3,
    price: 60,
    imgurl: "https://micro-cdn.sumo.com/image-resize/sumo-convert?uri=https://media.sumo.com/storyimages/ef624259-6815-44e2-b905-580f927bd608&hash=aa79d9187ddde664f8b3060254f1a5d57655a3340145e011b5b5ad697addb9c0&format=webp"
  },
]
router.post(
  "/api/1.0/departements",
  check("nama")
    .notEmpty()
    .withMessage("nama_null")
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage("nama_size"),
  check("url").notEmpty().withMessage("url_null"),
  check("industri")
    .notEmpty()
    .withMessage("industri_null")
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage("industri_size"),
  check("lokasi")
    .notEmpty()
    .withMessage("lokasi_null")
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage("lokasi_size"),
  check("alamat")
    .notEmpty()
    .withMessage("alamat_null")
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage("alamat_size"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = {};
      errors
        .array()
        .forEach((error) => (validationErrors[error.param] = req.t(error.msg)));
      return res.status(400).send({ validationErrors: validationErrors });
    }
    await DepartementsService.departmentPost(req.body);
    return res.send({ message: req.t("newDeparement_create_success") });
  }
);

router.get("/api/1.0/departements", async (req, res) => {
  const departements = await DepartementsService.allDepartmentGet(req.body);
  return res.send({ departements });
});

router.get("/trypdf", async (req, res) => {
  const html = fs.readFileSync(path.join(__dirname, '../toPDF/template/temp.html'), 'utf-8');
  const filename = Math.random() + '_doc' + '.pdf';
  let array = [];

  data.forEach(d => {
    const prod = {
      name: d.name,
      description: d.description,
      unit: d.unit,
      quantity: d.quantity,
      price: d.price,
      total: d.quantity * d.price,
      imgurl: d.imgurl
    }
    array.push(prod);
  });

  let subtotal = 0;
  array.forEach(i => {
    subtotal += i.total
  });
  const tax = (subtotal * 20) / 100;
  const grandtotal = subtotal - tax;
  const obj = {
    prodlist: array,
    subtotal: subtotal,
    tax: tax,
    gtotal: grandtotal
  }
  const document = {
    html: html,
    data: {
      products: obj
    },
    path: './docs/' + filename
  }
  pdf.create(document, options)
    .then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    });
  const filepath = 'http://localhost:3000/docs/' + filename;

   res.send({
    path: filepath
  });
});

router.get("/api/1.0/departements/:id", async (req, res) => {
  const departement = await DepartementsService.departmentGet(req.params.id);
  if (!departement) {
    return res.send({
      message: req.t(`no data with id ${req.params.id} exist!`),
    });
  }
  return res.send({ departement });
});

router.delete("/api/1.0/departements/:id", async (req, res) => {
  const checkDdepartement = await DepartementsService.departmentGet(
    req.params.id
  );
  if (!checkDdepartement) {
    return res.send({
      message: req.t(`no data with id ${req.params.id} exist!`),
    });
  } else {
    await DepartementsService.departementDelete(req.params.id);
    return res.send({
      message: req.t(`departement with id ${req.params.id} deleted`),
    });
  }
});

module.exports = router;
