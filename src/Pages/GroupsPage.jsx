import { useEffect, useMemo } from "react";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { groups } from "../data/groups.js";



function GroupsPage({
  standings,
  setStandings,
  onCompletionChange,
  onGoToBracket,
}) {
  

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 120,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const completedGroupsCount = useMemo(() => {
    return groups.filter((group) =>
      standings[group.letter].every((team) => team !== null),
    ).length;
  }, [standings]);

  const isGroupsComplete = completedGroupsCount === groups.length;

  useEffect(() => {
    onCompletionChange?.(isGroupsComplete);
  }, [isGroupsComplete, onCompletionChange]);

  function selectTeam(groupLetter, team) {
    setStandings((current) => {
      const currentGroup = current[groupLetter];

      const alreadySelected = currentGroup.some(
        (selectedTeam) => selectedTeam?.id === team.id,
      );

      if (alreadySelected) return current;

      const emptyIndex = currentGroup.findIndex((slot) => slot === null);

      if (emptyIndex === -1) return current;

      const sourceGroup = groups.find((group) => group.letter === groupLetter);

      const updatedGroup = [...currentGroup];
      updatedGroup[emptyIndex] = team;

      const selectedTeams = updatedGroup.filter(Boolean);

      // Auto-fill the 4th position when the user has selected 3 teams.
      if (selectedTeams.length === 3) {
        const selectedIds = new Set(selectedTeams.map((selected) => selected.id));

        const remainingTeam = sourceGroup.teams.find(
          (groupTeam) => !selectedIds.has(groupTeam.id),
        );

        const lastEmptyIndex = updatedGroup.findIndex((slot) => slot === null);

        if (remainingTeam && lastEmptyIndex !== -1) {
          updatedGroup[lastEmptyIndex] = remainingTeam;
        }
      }

      return {
        ...current,
        [groupLetter]: updatedGroup,
      };
    });
  }

  function removeTeam(groupLetter, teamId) {
    setStandings((current) => {
      const filledTeams = current[groupLetter].filter(
        (team) => team && team.id !== teamId,
      );

      const updatedGroup = [
        ...filledTeams,
        ...Array(4 - filledTeams.length).fill(null),
      ];

      return {
        ...current,
        [groupLetter]: updatedGroup,
      };
    });
  }

  function reorderTeam(groupLetter, activeId, overId) {
    if (!overId || activeId === overId) return;

    setStandings((current) => {
      const filledTeams = current[groupLetter].filter(Boolean);

      const oldIndex = filledTeams.findIndex((team) => team.id === activeId);
      const newIndex = filledTeams.findIndex((team) => team.id === overId);

      if (oldIndex === -1 || newIndex === -1) return current;

      const reorderedTeams = arrayMove(filledTeams, oldIndex, newIndex);

      const updatedGroup = [
        ...reorderedTeams,
        ...Array(4 - reorderedTeams.length).fill(null),
      ];

      return {
        ...current,
        [groupLetter]: updatedGroup,
      };
    });
  }

  return (
    <section className="bg-[#050505] px-4 py-8 text-white">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
            <p className="text-xs font-black uppercase tracking-[0.4em] text-yellow-400">
            Step 1
            </p>

            <h1 className="mt-3 text-4xl font-black uppercase leading-none tracking-wide md:text-6xl">
            Groups
            </h1>
        </div>

        
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((group) => (
            <GroupCard
              key={group.letter}
              group={group}
              standings={standings[group.letter]}
              sensors={sensors}
              onSelectTeam={selectTeam}
              onRemoveTeam={removeTeam}
              onReorderTeam={reorderTeam}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30 md:flex-row">
          <div>
           <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-yellow-400">
                Progress
            </p>

            <h2 className="mt-2 text-2xl font-black text-white">
                {completedGroupsCount}/{groups.length} groups ready
            </h2>
            </div>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Complete every group to unlock third-place selection.
            </p>
          </div>

          <button
            type="button"
            disabled={!isGroupsComplete}
            onClick={onGoToBracket}
            className={[
              "group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-black uppercase tracking-[0.22em] transition",
              isGroupsComplete
                ? "bg-yellow-400 text-black shadow-[0_0_30px_rgba(250,204,21,0.25)] hover:bg-yellow-300"
                : "cursor-not-allowed border border-white/10 bg-white/[0.04] text-zinc-600",
            ].join(" ")}
          >
            Select Best Third Placed Teams
            <span
              className={[
                "transition",
                isGroupsComplete && "group-hover:translate-x-1",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

function GroupCard({
  group,
  standings,
  sensors,
  onSelectTeam,
  onRemoveTeam,
  onReorderTeam,
}) {
  const selectedIds = standings.filter(Boolean).map((team) => team.id);
  const filledTeams = standings.filter(Boolean);
  const emptyCount = 4 - filledTeams.length;

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    onReorderTeam(group.letter, active.id, over.id);
  }

  return (
    <article className="rounded-2xl border border-white/10 bg-[#111111] p-4 shadow-2xl shadow-black/40 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black tracking-tight text-white">
            Group {group.letter}
          </h2>

          
        </div>

        
      </header>

      <div className="mb-4 grid grid-cols-2 gap-2">
        {group.teams.map((team) => {
          const isSelected = selectedIds.includes(team.id);

          return (
            <TeamChoice
              key={team.id}
              team={team}
              isSelected={isSelected}
              onClick={() => onSelectTeam(group.letter, team)}
            />
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filledTeams.map((team) => team.id)}
            strategy={verticalListSortingStrategy}
          >
            {filledTeams.map((team, index) => (
              <SortableRankingRow
                key={team.id}
                groupLetter={group.letter}
                team={team}
                position={index + 1}
                onRemoveTeam={onRemoveTeam}
              />
            ))}
          </SortableContext>
        </DndContext>

        {Array.from({ length: emptyCount }).map((_, index) => {
          const position = filledTeams.length + index + 1;

          return <EmptyRankingSlot key={position} position={position} />;
        })}
      </div>
    </article>
  );
}

function TeamChoice({ team, isSelected, onClick }) {
  return (
    <button
      type="button"
      title={team.name}
      disabled={isSelected}
      onClick={onClick}
      className={[
        "flex min-h-10 items-center gap-2 rounded-xl border px-3 py-2 text-left transition duration-200",
        isSelected
          ? "cursor-not-allowed border-white/5 bg-white/[0.03] text-zinc-600 opacity-45"
          : "border-white/10 bg-white/[0.07] text-zinc-100 hover:border-yellow-400/60 hover:bg-yellow-400/10 hover:text-yellow-200",
      ].join(" ")}
    >
      <Flag team={team} />

      <span className="min-w-0 truncate text-xs font-black leading-tight sm:text-sm">
        {team.name}
      </span>
    </button>
  );
}

function SortableRankingRow({ groupLetter, team, position, onRemoveTeam }) {
  const {
    attributes,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: team.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const shadeByPosition = {
    1: "bg-emerald-500/10 border-emerald-500/20",
    2: "bg-emerald-500/10 border-emerald-500/20",
    3: "bg-yellow-400/10 border-yellow-400/20",
    4: "bg-red-500/10 border-red-500/20",
  };

  const numberByPosition = {
    1: "bg-emerald-400 text-black",
    2: "bg-emerald-400 text-black",
    3: "bg-yellow-400 text-black",
    4: "bg-red-500 text-white",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={[
        "group/slot relative flex min-h-[50px] items-center border-b border-white/10 px-3 transition-colors last:border-b-0",
        shadeByPosition[position],
        isDragging
          ? "z-50 scale-[1.02] rounded-xl border border-yellow-400/40 bg-[#1c1c1c] shadow-2xl shadow-black/70"
          : "hover:bg-white/[0.08]",
      ].join(" ")}
    >
      <span
        className={[
          "mr-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black",
          numberByPosition[position],
        ].join(" ")}
      >
        {position}
      </span>

      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Flag team={team} />

        <p className="truncate text-sm font-black text-white">{team.name}</p>
      </div>

      <div className="ml-2 flex shrink-0 items-center gap-2">
        <button
          ref={setActivatorNodeRef}
          type="button"
          {...attributes}
          {...listeners}
          className="flex h-7 w-7 touch-none items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white/10 hover:text-yellow-300 active:cursor-grabbing"
          aria-label={`Drag ${team.name}`}
          title="Drag to reorder"
        >
          <DragHandle />
        </button>

        <button
          type="button"
          onClick={() => onRemoveTeam(groupLetter, team.id)}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/30 text-xs font-black text-zinc-400 opacity-0 transition hover:border-red-400/60 hover:text-red-300 group-hover/slot:opacity-100"
          aria-label={`Remove ${team.name}`}
        >
          ×
        </button>
      </div>
    </div>
  );
}

function EmptyRankingSlot({ position }) {
  const shadeByPosition = {
    1: "bg-emerald-500/10 border-emerald-500/20",
    2: "bg-emerald-500/10 border-emerald-500/20",
    3: "bg-yellow-400/10 border-yellow-400/20",
    4: "bg-red-500/10 border-red-500/20",
  };

  const numberByPosition = {
    1: "bg-emerald-400 text-black",
    2: "bg-emerald-400 text-black",
    3: "bg-yellow-400 text-black",
    4: "bg-red-500 text-white",
  };

  return (
    <div
      className={[
        "flex min-h-[50px] items-center border-b border-dashed border-white/10 px-3 opacity-70 last:border-b-0",
        shadeByPosition[position],
      ].join(" ")}
    >
      <span
        className={[
          "mr-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black",
          numberByPosition[position],
        ].join(" ")}
      >
        {position}
      </span>

      <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-600">
        Choose team
      </p>
    </div>
  );
}

function DragHandle() {
  return (
    <span
      className="grid grid-cols-2 place-items-center gap-x-0.5 gap-y-0.5"
      aria-hidden="true"
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      <span className="h-1 w-1 rounded-full bg-current" />
      <span className="h-1 w-1 rounded-full bg-current" />
      <span className="h-1 w-1 rounded-full bg-current" />
      <span className="h-1 w-1 rounded-full bg-current" />
      <span className="h-1 w-1 rounded-full bg-current" />
    </span>
  );
}

function Flag({ team }) {
  return (
    <img
      src={`https://flagcdn.com/${team.flagCode}.svg`}
      alt=""
      className="h-4 w-6 shrink-0 rounded-[2px] object-cover shadow-sm ring-1 ring-black/20"
      loading="lazy"
    />
  );
}

export default GroupsPage;