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
import ExperienceItem from "./ExperienceItem";
import "./ExperiencesList.css";

const ExperiencesList = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Fetch experiences from the server
  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/resume/experience");
      if (!response.ok) {
        throw new Error("Failed to fetch experiences");
      }
      const data = await response.json();
      setExperiences(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching experiences:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update the order on the server
  const updateExperienceOrder = async (newOrder) => {
    try {
      const response = await fetch(
        "http://localhost:5000/resume/experience/reorder",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            experiences: newOrder.map((exp, index) => ({
              id: exp.id,
              order: index,
            })),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update experience order");
      }

      console.log("Experience order updated successfully");
    } catch (err) {
      console.error("Error updating experience order:", err);
      // Optionally show an error message to the user
      setError("Failed to update order. Please try again.");
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setExperiences((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newOrder = arrayMove(items, oldIndex, newIndex);
        
        // Update the server with the new order
        updateExperienceOrder(newOrder);
        
        return newOrder;
      });
    }
  };

  const handleDelete = (id) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  if (loading) {
    return <div className="experiences-loading">Loading experiences...</div>;
  }

  if (error) {
    return (
      <div className="experiences-error">
        <p>Error: {error}</p>
        <button onClick={fetchExperiences}>Retry</button>
      </div>
    );
  }

  if (experiences.length === 0) {
    return (
      <div className="experiences-empty">
        <p>No experiences added yet. Add your first experience above!</p>
      </div>
    );
  }

  return (
    <div className="experiences-list">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={experiences.map((exp) => exp.id)}
          strategy={verticalListSortingStrategy}
        >
          {experiences.map((experience) => (
            <ExperienceItem
              key={experience.id}
              experience={experience}
              onDelete={handleDelete}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ExperiencesList;