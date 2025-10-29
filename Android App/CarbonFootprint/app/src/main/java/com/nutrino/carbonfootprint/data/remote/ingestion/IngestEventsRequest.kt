package com.nutrino.carbonfootprint.data.remote.ingestion

import kotlinx.serialization.Serializable

@Serializable
data class EventRequest(
    val occurred_at: String,
    val category: String,
    val unit: String,
    val value_numeric: Double,
    val facility_id: Int? = null
)

@Serializable
data class IngestEventsRequest(
    val events: List<EventRequest>
)
