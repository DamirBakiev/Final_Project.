import React, { useState } from "react";
import { useLanguage } from "./LanguageProvider";

const Report = () => {
  const { t } = useLanguage();
  const [report, setReport] = useState({
    location: "",
    date: "",
    time: "",
    description: "",
    evidence: null,
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setReport({
      ...report,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    const formData = new FormData();
    formData.append("location", report.location);
    formData.append("date", report.date);
    formData.append("time", report.time);
    formData.append("description", report.description);
    if (report.evidence) {
      formData.append("evidence", report.evidence);
    }

    try {
      const response = await fetch("https://68578f8c21f5d3463e557f11.mockapi.io/Users/respot", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit report");
      }

      setSuccess(true);
      setReport({
        location: "",
        date: "",
        time: "",
        description: "",
        evidence: null,
      });
    } catch (err) {
      console.error(err);
      setError(t("report_error") || "Something went wrong");
    }
  };

  return (
    <div className="report-page">
      <h2>{t("report_title")}</h2>
      <p>{t("report_note")}</p>

      {success && <div className="success-message">{t("report_success")}</div>}
      {error && <div className="error-message">{error}</div>}

      <form className="report-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="location"
          placeholder={t("report_location")}
          value={report.location}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={report.date}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="time"
          value={report.time}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder={t("report_description")}
          value={report.description}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="evidence"
          accept="image/*,video/*,application/pdf"
          onChange={handleChange}
        />

        <button type="submit">{t("report_submit")}</button>
      </form>
    </div>
  );
};

export default Report;

