import { useEffect, useMemo, useState } from "react";
import TournamentNav from "./Components/TournamentNav";
import GroupsPage from "./Pages/GroupsPage.jsx";
import ThirdPlacePage from "./Pages/ThirdPlacePage.jsx";
import BracketPage from "./Pages/BracketPage.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import SiteFooter from "./Components/SiteFooter.jsx";
import { groups } from "./data/groups.js";
import { createRankedStandings } from "./Utils/groupUtils.js";

const STORAGE_KEY = "world-cup-2026-predictor-progress-v1";

function createInitialStandings() {
  return groups.reduce((acc, group) => {
    acc[group.letter] = [null, null, null, null];
    return acc;
  }, {});
}

function getDefaultProgress() {
  return {
    activeStep: "landing",
    standings: createInitialStandings(),
    selectedThirdIds: [],
    knockoutWinners: {},
  };
}

function normalizeStep(step) {
  const validSteps = ["landing", "groups", "third-place", "bracket"];

  if (validSteps.includes(step)) return step;

  return "landing";
}

function loadSavedProgress() {
  try {
    const savedProgress = localStorage.getItem(STORAGE_KEY);

    if (!savedProgress) {
      return getDefaultProgress();
    }

    const parsedProgress = JSON.parse(savedProgress);
    const defaultProgress = getDefaultProgress();

    return {
      activeStep: normalizeStep(parsedProgress.activeStep),
      standings: parsedProgress.standings || defaultProgress.standings,
      selectedThirdIds:
        parsedProgress.selectedThirdIds || defaultProgress.selectedThirdIds,
      knockoutWinners:
        parsedProgress.knockoutWinners || defaultProgress.knockoutWinners,
    };
  } catch (error) {
    console.error("Failed to load saved progress:", error);
    return getDefaultProgress();
  }
}

function App() {
  const savedProgress = useMemo(() => loadSavedProgress(), []);

  const [activeStep, setActiveStep] = useState(savedProgress.activeStep);
  const [standings, setStandings] = useState(savedProgress.standings);
  const [selectedThirdIds, setSelectedThirdIds] = useState(
    savedProgress.selectedThirdIds,
  );
  const [knockoutWinners, setKnockoutWinners] = useState(
    savedProgress.knockoutWinners,
  );

  const isLanding = activeStep === "landing";

  const isGroupsComplete = useMemo(() => {
    return groups.every((group) =>
      standings[group.letter]?.every((team) => team !== null),
    );
  }, [standings]);

  const validThirdTeamIds = useMemo(() => {
    return new Set(
      groups
        .map((group) => standings[group.letter]?.[2]?.id)
        .filter(Boolean),
    );
  }, [standings]);

  const isThirdPlaceComplete = useMemo(() => {
    return (
      selectedThirdIds.length === 8 &&
      selectedThirdIds.every((teamId) => validThirdTeamIds.has(teamId))
    );
  }, [selectedThirdIds, validThirdTeamIds]);

  useEffect(() => {
    setSelectedThirdIds((current) =>
      current.filter((teamId) => validThirdTeamIds.has(teamId)),
    );
  }, [validThirdTeamIds]);

  useEffect(() => {
    const progress = {
      activeStep,
      standings,
      selectedThirdIds,
      knockoutWinners,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [activeStep, standings, selectedThirdIds, knockoutWinners]);

  useEffect(() => {
    if (activeStep === "third-place" && !isGroupsComplete) {
      setActiveStep("groups");
    }

    if (activeStep === "bracket" && !isGroupsComplete) {
      setActiveStep("groups");
    }

    if (activeStep === "bracket" && isGroupsComplete && !isThirdPlaceComplete) {
      setActiveStep("third-place");
    }
  }, [activeStep, isGroupsComplete, isThirdPlaceComplete]);

  function handleStepChange(nextStep) {
    if (nextStep === "third-place" && !isGroupsComplete) return;
    if (nextStep === "bracket" && (!isGroupsComplete || !isThirdPlaceComplete)) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setActiveStep(nextStep);
  }

  function startPrediction() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setActiveStep("groups");
  }
  

  function goToThirdPlace() {
    if (!isGroupsComplete) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setActiveStep("third-place");
  }

  function goToBracket() {
    if (!isThirdPlaceComplete) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setActiveStep("bracket");
  }

  function autoPickGroupsByRank() {
    setActiveStep("groups");
    setStandings(createRankedStandings());
    setSelectedThirdIds([]);
    setKnockoutWinners({});

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function resetPrediction() {
    localStorage.removeItem(STORAGE_KEY);

    setActiveStep("groups");
    setStandings(createInitialStandings());
    setSelectedThirdIds([]);
    setKnockoutWinners({});

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {isLanding ? (
        <LandingPage onStart={startPrediction} />
      ) : (
        <>
          <TournamentNav
            activeStep={activeStep}
            onStepChange={handleStepChange}
            isGroupsComplete={isGroupsComplete}
            isThirdPlaceComplete={isThirdPlaceComplete}
            onResetPrediction={resetPrediction}
          />

          <div className="min-h-screen">
            {activeStep === "groups" && (
              <GroupsPage
  standings={standings}
  setStandings={setStandings}
  onGoToBracket={goToThirdPlace}
  onAutoPickByRank={autoPickGroupsByRank}
/>
            )}

            {activeStep === "third-place" && (
              <ThirdPlacePage
                standings={standings}
                selectedThirdIds={selectedThirdIds}
                setSelectedThirdIds={setSelectedThirdIds}
                setKnockoutWinners={setKnockoutWinners}
                onGoToBracket={goToBracket}
              />
            )}

            {activeStep === "bracket" && (
              <BracketPage
                standings={standings}
                selectedThirdIds={selectedThirdIds}
                knockoutWinners={knockoutWinners}
                setKnockoutWinners={setKnockoutWinners}
              />
            )}
          </div>

          <div className="mt-20">
            <SiteFooter />
          </div>
        </>
      )}
    </main>
  );
}

export default App;