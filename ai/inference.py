"""
Inference entrypoint for demand and pricing suggestions.
"""

from model import score_demand


def suggest_daily_price(base_price: float, demand_score: float) -> float:
    """
    Increases price modestly for high-demand equipment.
    """
    multiplier = 1.0 + (demand_score * 0.15)
    return round(base_price * multiplier, 2)


if __name__ == "__main__":
    signal = score_demand("Harvester", "Mandya", historical_bookings=30)
    recommendation = suggest_daily_price(base_price=4500, demand_score=signal.demand_score)
    print({"signal": signal, "suggested_daily_price": recommendation})

