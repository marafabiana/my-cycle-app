"use client";

import React, { useMemo } from "react";
import { addDays, eachDayOfInterval, isSameDay } from "date-fns";

interface CycleStatusProps {
  lastPeriod?: Date | null;
}

export default function CycleStatus({ lastPeriod }: CycleStatusProps) {
  const today = new Date();

  /**
   * Calculate the cycle phases for the current month.
   */
  const { menstruation, fertile, pms } = useMemo(() => {
    if (!lastPeriod) {
      return { menstruation: [], fertile: [], pms: [] };
    }

    const menstruation: Date[] = [];
    const fertile: Date[] = [];
    const pms: Date[] = [];

    const cycleStart = lastPeriod;
    const menstruationStart = cycleStart;
    const menstruationEnd = addDays(menstruationStart, 4);
    const fertileStart = addDays(menstruationEnd, 3);
    const fertileEnd = addDays(fertileStart, 5);
    const nextMenstruation = addDays(menstruationStart, 28);
    const pmsStart = addDays(nextMenstruation, -10);

    menstruation.push(
      ...eachDayOfInterval({ start: menstruationStart, end: menstruationEnd })
    );
    fertile.push(
      ...eachDayOfInterval({ start: fertileStart, end: fertileEnd })
    );
    pms.push(...eachDayOfInterval({ start: pmsStart, end: nextMenstruation }));

    return { menstruation, fertile, pms };
  }, [lastPeriod]);

  /**
   * Checks which phase "today" is in
   */
  const isMenstruation = menstruation.some((d) => isSameDay(d, today));
  const isFertile = fertile.some((d) => isSameDay(d, today));
  const isPms = pms.some((d) => isSameDay(d, today));

  let phaseMessage: React.ReactNode = null;

  if (isMenstruation) {
    phaseMessage = (
      <>
        <p>
          You are on the <strong>Menstrual Phase</strong>.
        </p>
        <p>
          <strong>Nutrition:</strong> It might be helpful to eat extra iron-rich
          foods (red meat, seafood, dried fruits, nuts, legumes, beans, green
          leafy vegetables, salmon, flax seeds, and walnuts). Note that vitamin
          C can increase iron absorption, while calcium can decrease it.
        </p>
        <p>
          <strong>Exercise:</strong> Try focusing on lower-impact exercises,
          such as yoga or Pilates.
        </p>
        <p>
          <strong>Sleep:</strong> Adjust your schedule to allow for an extra
          hour of sleep or a late afternoon nap could help.
        </p>
      </>
    );
  } else if (isFertile) {
    phaseMessage = (
      <>
        <p>
          You are on the <strong>Ovulatory Phase</strong>.
        </p>
        <p>
          <strong>Nutrition:</strong> Take a B complex vitamin that helps reduce
          the risk of certain brain and neurological conditions in early
          pregnancy. Eat foods rich in zinc and magnesium, such as seeds, nuts,
          and whole grains, to support ovulation.
        </p>
        <p>
          <strong>Exercise:</strong> Your energy levels are at their peak!
          Engage in high-intensity workouts like running, weight training, or
          HIIT (high-intensity interval training).
        </p>
        <p>
          <strong>Sleep:</strong> You might feel more energetic, but maintaining
          a consistent sleep schedule helps balance hormones and improve
          recovery.
        </p>
      </>
    );
  } else if (isPms) {
    phaseMessage = (
      <>
        <p>
          You are in the <strong>PMS Phase</strong>.
        </p>
        <p>
          <strong>Nutrition:</strong> Focus on magnesium-rich foods (dark
          chocolate, spinach, almonds) to help with mood swings and cramps.
          Reduce caffeine and sugar intake to avoid worsening symptoms.
        </p>
        <p>
          <strong>Exercise:</strong> Light activities like walking, stretching,
          or gentle yoga can help reduce stress and ease discomfort.
        </p>
        <p>
          <strong>Sleep:</strong> Prioritize relaxation before bed, avoid
          screens, and try herbal teas like chamomile to improve sleep quality.
        </p>
      </>
    );
  }

  return (
    <div className="p-4 border-x border-b mt-4">
      {/* Color legend */}
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-4 h-4 bg-red-500" />
          <span>Menstruation</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-block w-4 h-4 bg-green-500" />
          <span>Ovulation</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-block w-4 h-4 bg-gray-500" />
          <span>PMS</span>
        </div>
      </div>

      {/* Recommendation message */}
      {phaseMessage && (
        <div className="text-sm text-gray-700">{phaseMessage}</div>
      )}
    </div>
  );
}
