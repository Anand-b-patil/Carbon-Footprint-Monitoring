package com.nutrino.carbonfootprint.data.remote.ingestion

import kotlinx.serialization.Serializable

@Serializable
data class IngestEventsResponse(
    val created_events: Int = 0,
    val skipped_duplicates: Int = 0,
    val created_emissions: Int = 0
)
