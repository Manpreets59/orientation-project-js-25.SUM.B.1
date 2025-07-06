import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./ExperienceItem.css";

const ExperienceItem = ({ experience, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: experience.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/resume/experience/${experience.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete experience");
        }

        onDelete(experience.id);
      } catch (err) {
        console.error("Error deleting experience:", err);
        alert("Failed to delete experience. Please try again.");
      }
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`experience-item ${isDragging ? "dragging" : ""}`}
    >
      <div className="experience-drag-handle" {...attributes} {...listeners}>
        <span className="drag-icon">⋮⋮</span>
      </div>
      
      <div className="experience-content">
        <div className="experience-header">
          <h3 className="experience-title">{experience.title}</h3>
          <span className="experience-company">{experience.company}</span>
        </div>
        
        <div className="experience-dates">
          {experience.start_date} - {experience.end_date || "Present"}
        </div>
        
        {experience.description && (
          <p className="experience-description">{experience.description}</p>
        )}
        
        {experience.logo && (
          <div className="experience-logo">
            <img src={experience.logo} alt={`${experience.company} logo`} />
          </div>
        )}
      </div>
      
      <div className="experience-actions">
        <button
          className="delete-button"
          onClick={handleDelete}
          title="Delete experience"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default ExperienceItem;