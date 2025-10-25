package com.nutrino.carbonfootprint.data.remote.ingestion

import kotlinx.serialization.Serializable

@Serializable
data class EventRequest(
    val occurred_at: String,
    val category: String,
    val unit: String,
    val value_numeric: Double,
    val facility_id: Int? = null,
    val source_id: String? = null,
    val subcategory: String? = null,
    val currency: String? = null,
    val spend_value: Double? = null
)

@Serializable
data class IngestEventsRequest(
    val events: List<EventRequest>
)
