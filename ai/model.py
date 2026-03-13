"""
Lightweight starter model utilities for the hackathon prototype.
"""

from dataclasses import dataclass


@dataclass
class EquipmentDemandSignal:
    category: str
    location: str
    demand_score: float


def score_demand(category: str, location: str, historical_bookings: int) -> EquipmentDemandSignal:
    """
    Simple baseline heuristic that can later be replaced with ML.
    """
    demand_score = min(1.0, max(0.1, historical_bookings / 50))
    return EquipmentDemandSignal(category=category, location=location, demand_score=demand_score)


if __name__ == "__main__":
    signal = score_demand("Tractor", "Mysuru", 18)
    print(signal)

