package handlers

// import (
// 	"backend/utils"
// 	"net/http"

// 	_ "github.com/lib/pq"
// )

// func GetAllUsers(c *gin.Context) {
// 	users := utils.FindAllUsers()

// 	responseBody := utils.CreateResponseBody("components", "Successfully returned all components", "Success", users)

// 	c.JSON(http.StatusOK, responseBody)
// }

// // Middleware. Extract component id from url. Abort if component id does not exist in url.
// func ExtractComponentId(c *gin.Context) {
// 	// Helper function. Log the error, abort the following handlers,
// 	// and return a 400 response with error message
// 	abortWithErrorMsg := func(errorMsg string) {
// 		log.Println(errorMsg)
// 		c.AbortWithStatusJSON(http.StatusBadRequest, utils.ErrorResponse("Fail to extract component id"))
// 	}

// 	// Extract component id string from url
// 	componentIdStr := c.Param(utils.PARAM_COMPONENT_ID)
// 	if len(componentIdStr) == 0 {
// 		abortWithErrorMsg("component id field is empty")
// 		return
// 	}

// 	// Convert component id string to uint
// 	componentId, err := utils.ParseUint(componentIdStr)
// 	if err != nil {
// 		abortWithErrorMsg(err.Error())
// 		return
// 	}

// 	// Save to gin context
// 	c.Set(utils.PARAM_COMPONENT_ID, componentId)
// }

// func GetComponentsHandler(c *gin.Context) {
// 	components := utils.FindAllComponents()

// 	responseBody := utils.CreateResponseBody("components", "Successfully returned all components", "Success", components)

// 	c.JSON(http.StatusOK, responseBody)
// }

// func GetComponentWithIdHandler(c *gin.Context) {
// 	componentId := c.GetUint(utils.PARAM_COMPONENT_ID)

// 	component, exists := utils.FindComponentById(uint(componentId))
// 	var msg, status string
// 	if !exists {
// 		msg = fmt.Sprintf("Fail to find component with ID %v", componentId)
// 		status = "Failure"
// 	} else {
// 		msg = "Component found"
// 		status = "Success"
// 	}

// 	responseBody := utils.CreateResponseBody("component", msg, status, component)

// 	c.JSON(http.StatusOK, responseBody)
// }

// func GetComponentsWithNameHandler(c *gin.Context) {
// 	componentName := c.Query("componentName")
// 	components, exists := utils.FindComponentByName(componentName)
// 	var msg, status string
// 	if !exists {
// 		msg = fmt.Sprintf("Fail to find component with with name %s", componentName)
// 		status = "Failure"
// 	} else {
// 		msg = "Component found"
// 		status = "Success"
// 	}

// 	responseBody := utils.CreateResponseBody("components", msg, status, components)
// 	c.JSON(http.StatusOK, responseBody)

// }

// func SaveComponentHandler(c *gin.Context) {
// 	abortWithErrorMsg := func(errorMsg string) {
// 		log.Println(errorMsg)
// 		c.AbortWithStatusJSON(http.StatusBadRequest, utils.ErrorResponse("Fail to save component"))
// 	}

// 	n := &models.NameVersionComponent{}
// 	if err := c.BindJSON(n); err != nil {
// 		abortWithErrorMsg(err.Error())
// 		return
// 	}
// 	component := models.FromNameVersionComponent(n)

// 	if newComponent, success := utils.SaveComponent(*component); !success {
// 		abortWithErrorMsg("Fail to save component.")
// 		return
// 	} else {
// 		c.JSON(http.StatusOK, utils.CreateResponseBody("component", "Successfully saved component", "Success", newComponent))
// 	}
// }

// func UpdateComponentWithIdHandler(c *gin.Context) {
// 	abortWithErrorMsg := func(errorMsg string) {
// 		log.Println(errorMsg)
// 		c.AbortWithStatusJSON(http.StatusBadRequest, utils.ErrorResponse("Fail to update component"))
// 	}

// 	component := models.EmptyComponent()
// 	componentId := c.GetUint(utils.PARAM_COMPONENT_ID)

// 	if err := c.BindJSON(&component); err != nil {
// 		abortWithErrorMsg(err.Error())
// 		return
// 	}
// 	component.ID = componentId

// 	if newComponent, success := utils.UpdateComponent(*component); !success {
// 		abortWithErrorMsg("Fail to update component.")
// 		return
// 	} else {
// 		c.JSON(http.StatusOK, utils.CreateResponseBody("component", "Successfully updated component", "Success", newComponent))
// 	}
// }

// func UpdateComponentClassificationHandler(c *gin.Context) {
// 	abortWithErrorMsg := func(errorMsg string) {
// 		log.Println(errorMsg)
// 		c.AbortWithStatusJSON(http.StatusBadRequest, utils.ErrorResponse("Fail to update component classification"))
// 	}

// 	// Extract component id from context
// 	componentId := c.GetUint(utils.PARAM_COMPONENT_ID)

// 	// Extract classification level & name
// 	levelStr := c.Query(utils.PARAM_CLASSIFICATION_LEVEL)
// 	name := c.Query(utils.PARAM_CLASSIFICATION_NAME)
// 	level := uint(0)
// 	if l, err := utils.ParseUint(levelStr); err != nil || len(name) == 0 {
// 		abortWithErrorMsg("invalid classification name or level")
// 		return
// 	} else {
// 		level = l
// 	}

// 	component, success := utils.UpdateComponentClassification(componentId, level, name)

// 	if !success {
// 		c.JSON(http.StatusBadRequest, utils.ErrorResponse("Fail to update component classification"))
// 	} else {
// 		c.JSON(http.StatusOK, utils.CreateResponseBody("component", "Successfully updated component", "Success", component))
// 	}
// }

// func UpdateComponentStatusHandler(c *gin.Context) {
// 	componentId := c.GetUint(utils.PARAM_COMPONENT_ID)
// 	// statusStr := c.Query(utils.PARAM_STATUS_NAME)
// 	var Approval models.ApprovalResponse
// 	var statusStr string = "default"
// 	var commentStr string = "default"

// 	if err := c.BindJSON(&Approval); err != nil {
// 		log.Println("Failed to parse request body")
// 	}

// 	statusStr = Approval.Status
// 	commentStr = Approval.Comment

// 	fmt.Println(statusStr);
// 	fmt.Println(commentStr);

// 	component, success := utils.UpdateComponentStatus(componentId, statusStr)

// 	if !success {
// 		c.JSON(http.StatusBadRequest, utils.ErrorResponse("Fail to update component status"))
// 	} else {
// 		c.JSON(http.StatusOK, utils.CreateResponseBody("component", "Successfully updated component", "Success", component))
// 	}
// }

// func DeleteComponentWithIdHandler(c *gin.Context) {
// 	componentId := c.GetUint(utils.PARAM_COMPONENT_ID)

// 	success := utils.DeleteComponentById(componentId)

// 	if !success {
// 		c.JSON(http.StatusBadRequest, utils.ErrorResponse("Fail to delete component"))
// 	} else {
// 		c.Status(http.StatusOK)
// 	}
// }

// func SubmitComponentWithIdHandler(c *gin.Context) {
// 	componentId := c.GetUint(utils.PARAM_COMPONENT_ID)

// 	valid, reason := utils.ValidateComponent(componentId)

// 	if !valid {
// 		c.JSON(http.StatusBadRequest, utils.ErrorResponse(reason))
// 		return
// 	}

// 	// TODO: send component to approval service

// 	component, success := utils.UpdateComponentStatus(componentId, models.STATUS_COMPONENT_PENDING_APPROVAL)
// 	log.Printf("Submitted component: %+v\n", component)

// 	if !success {
// 		c.JSON(http.StatusBadRequest, utils.ErrorResponse("Fail to update component status."))
// 	} else {
// 		c.JSON(http.StatusOK, utils.CreateResponseBody("component", "Successfully submitted component", "Success", component))
// 	}
// }
