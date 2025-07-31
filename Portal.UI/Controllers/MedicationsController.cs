﻿using Portal.Business.Handler;
using Portal.Business.Models;
using Portal.Business.Models.DataTables;
using Portal.Business.Utils;
using Portal.UI.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Portal.UI.Controllers
{
    [LoginValidate]
    public class MedicationsController : Controller
    {
        // GET: Medications
        public ActionResult Index()
        {
            return View();
        }
        public async Task<ActionResult> ListMedications(FilterDataTableModel model)
        {
            MedicationHandler handler = new MedicationHandler();

            var response = await handler.GetMedicationsListAsync(model);

            return Json(response.Data);

        }

        public async Task<ActionResult> GetMedication(int id)
        {
            MedicationHandler handler = new MedicationHandler();

            var response = await handler.GetMedicationAsync(id);
            if (response.ResponseType == ResponseType.OK)
            {
                return Json(new MessageResponse<MedicationModel>()
                {
                    Message = response.Message,
                    Number = 200,
                    Data = response.Data
                }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new MessageResponse()
                {
                    Message = response.Message,
                    Number = 500
                }, JsonRequestBehavior.AllowGet);
            }

        }


        public async Task<ActionResult> SaveMedication(MedicationModel medication)
        {
            MedicationHandler handler = new MedicationHandler();

            var response = await handler.CreateMedicationAsync(medication);
            if (response.ResponseType == ResponseType.OK)
            {
                return Json(new MessageResponse()
                {
                    Message = response.Message,
                    Number = 200
                });
            }
            else
            {
                return Json(new MessageResponse()
                {
                    Message = response.Message,
                    Number = 500
                });
            }
        }

        public async Task<ActionResult> UpdateMedication(MedicationModel medication)
        {
            MedicationHandler handler = new MedicationHandler();

            var response = await handler.ModifyMedication(medication);
            if (response.ResponseType == ResponseType.OK)
            {
                return Json(new MessageResponse()
                {
                    Message = response.Message,
                    Number = 200
                });
            }
            else
            {
                return Json(new MessageResponse()
                {
                    Message = response.Message,
                    Number = 500
                });
            }

        }

        public async Task<ActionResult> DeleteMedication(int medicationId)
        {
            MedicationHandler handler = new MedicationHandler();

            var response = await handler.RemoveMedication(medicationId);
            if (response.ResponseType == ResponseType.OK)
            {
                return Json(new MessageResponse()
                {
                    Message = response.Message,
                    Number = 200
                });
            }
            else
            {
                return Json(new MessageResponse()
                {
                    Message = response.Message,
                    Number = 500
                });
            }
        }

        public async Task<ActionResult> ListPharmaceuticalForms()
        {
            MedicationHandler handler = new MedicationHandler();

            var response = await handler.ListPharmaceuticalForms();

            return Json(response.Data, JsonRequestBehavior.AllowGet);

        }

    }
}