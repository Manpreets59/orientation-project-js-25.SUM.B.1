import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import SkillItem from "./SkillItem";
import "./SkillsList.css";

const SkillsList = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Fetch skills from the server
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/resume/skill");
      if (!response.ok) {
        throw new Error("Failed to fetch skills");
      }
      const data = await response.json();
      setSkills(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching skills:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update the order on the server
  const updateSkillOrder = async (newOrder) => {
    try {
      const response = await fetch(
        "http://localhost:5000/resume/skill/reorder",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skills: newOrder.map((skill, index) => ({
              id: skill.id,
              order: index,
            })),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update skill order");
      }

      console.log("Skill order updated successfully");
    } catch (err) {
      console.error("Error updating skill order:", err);
      // Optionally show an error message to the user
      setError("Failed to update order. Please try again.");
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setSkills((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newOrder = arrayMove(items, oldIndex, newIndex);
        
        // Update the server with the new order
        updateSkillOrder(newOrder);
        
        return newOrder;
      });
    }
  };

  const handleDelete = (id) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id));
  };

  if (loading) {
    return <div className="skills-loading">Loading skills...</div>;
  }

  if (error) {
    return (
      <div className="skills-error">
        <p>Error: {error}</p>
        <button onClick={fetchSkills}>Retry</button>
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="skills-empty">
        <p>No skills added yet. Add your first skill above!</p>
      </div>
    );
  }

  return (
    <div className="skills-list">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={skills.map((skill) => skill.id)}
          strategy={verticalListSortingStrategy}
        >
          {skills.map((skill) => (
            <SkillItem
              key={skill.id}
              skill={skill}
              onDelete={handleDelete}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default SkillsList;