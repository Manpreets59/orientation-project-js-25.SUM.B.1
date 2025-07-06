import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./SkillItem.css";

const SkillItem = ({ skill, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/resume/skill/${skill.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete skill");
        }

        onDelete(skill.id);
      } catch (err) {
        console.error("Error deleting skill:", err);
        alert("Failed to delete skill. Please try again.");
      }
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`skill-item ${isDragging ? "dragging" : ""}`}
    >
      <div className="skill-drag-handle" {...attributes} {...listeners}>
        <span className="drag-icon">⋮⋮</span>
      </div>
      
      <div className="skill-content">
        <div className="skill-header">
          <h3 className="skill-name">{skill.name}</h3>
          {skill.proficiency && (
            <span className="skill-proficiency">{skill.proficiency}</span>
          )}
        </div>
        
        {skill.logo && (
          <div className="skill-logo">
            <img src={skill.logo} alt={`${skill.name} logo`} />
          </div>
        )}
      </div>
      
      <div className="skill-actions">
        <button
          className="delete-button"
          onClick={handleDelete}
          title="Delete skill"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default SkillItem;