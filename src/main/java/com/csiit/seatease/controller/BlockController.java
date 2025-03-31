package com.csiit.seatease.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csiit.seatease.entity.Block;
import com.csiit.seatease.entity.Floor;
import com.csiit.seatease.entity.Room;
import com.csiit.seatease.entity.Seat;
import com.csiit.seatease.service.BlockService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/block")
public class BlockController {

	@Autowired
	private BlockService blockService;

	@PostMapping("/addBlock")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Block addBlock(@RequestBody Block block) {

		return blockService.addBlock(block);
	}

	@GetMapping("/list")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public List<Block> listBlocks() {
		System.out.println("Called list Blocks.........");
		List<Block> blockList = blockService.listBlocks();
		blockList.forEach(a -> System.out.println(a));
		return blockList;
	}

	@PostMapping("/saveFloor/{blockId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public String saveFloor(@PathVariable("blockId") long blockId, @RequestBody Floor floor) {
		System.out.println("Called saveFloor...");
		blockService.saveFloor(blockId, floor);
		return "Saved Successfully";
	}

	@GetMapping("/listFloor")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public List<Floor> listFloor() {
		return blockService.listFloor();

	}

	@GetMapping("/getFloors/{blockId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public List<Floor> getFloorsByBlockId(@PathVariable Long blockId) {
		return blockService.getFloorsByBlockId(blockId);
	}

	@GetMapping("/getRooms/{blockId}/{floorId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public List<Room> getRoomsByFloorId(@PathVariable("blockId") long blockId, @PathVariable("floorId") long floorId) {
		System.out.println("Called ..getRooms " + blockId + " : " + floorId);
		List<Room> roomList = blockService.getRoomsByFloorId(blockId, floorId);
		System.out.println(roomList.size());
		return roomList;
		// return blockService.getRoomsByFloorId(blockId,floorId);
	}

	@PostMapping("/saveRoom/{blockId}/{floorId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Room saveRoom(@PathVariable("blockId") long blockId, @PathVariable("floorId") long floorId,
			@RequestBody Room room) {
		System.out.println("SaveRoom...............");
		return blockService.saveRoom(blockId, floorId, room);
	}

	@PostMapping("/saveSeat/{blockId}/{floorId}/{roomId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Seat saveSeat(@PathVariable("blockId") long blockId, @PathVariable("floorId") long floorId,
			@PathVariable("roomId") long roomId, @RequestBody Seat seat) {

		return blockService.saveSeat(blockId, floorId, roomId, seat);
	}

	@GetMapping("/listSeats/{blockId}/{floorId}/{roomId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public List<Seat> listSeats(@PathVariable("blockId") long blockId, @PathVariable("floorId") long floorId,
			@PathVariable("roomId") long roomId) {
		return blockService.listSeats(blockId, floorId, roomId);
	}

	@PutMapping("/updateBlock/{blockId}")
	public Block updateBlock(@PathVariable("blockId") long blockId, @RequestBody Block block) {
		return blockService.updateBlock(blockId, block);
	}

	@PutMapping("/updateFloor/{floorId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Floor updateFloor(@PathVariable("floorId") long floorId, @RequestBody Floor floor) {
		return blockService.updateFloor(floorId, floor);
	}

	@GetMapping("/getBlockById/{blockId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Block getBlockById(@PathVariable("blockId") long blockId) {
		return blockService.getBlockById(blockId);
	}

	@GetMapping("getFloorById/{floorId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Floor getFloorById(@PathVariable("floorId") long floorId) {
		return blockService.getFloorById(floorId);
	}

	@GetMapping("getRoomById/{roomId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Room getRoomById(@PathVariable("roomId") long roomId) {
		return blockService.getRoomById(roomId);
	}

	@PutMapping("/updateRoom/{roomId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Room updateRoom(@PathVariable("roomId") long roomId, @RequestBody Room room) {
		return blockService.updateRoom(roomId, room);
	}

	@GetMapping("getSeatById/{seatId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Seat getSeatById(@PathVariable("seatId") long seatId) {
		System.out.println("getSeatById.......");
		return blockService.getSeatById(seatId);
	}

	@PutMapping("updateSeat/{seatId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Seat updateSeat(@PathVariable("seatId") long seatId, @RequestBody Seat seat) {
		return blockService.updateSeat(seatId, seat);
	}

	@DeleteMapping("/deleteBlock/{blockId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public void deleteBlock(@PathVariable("blockId") long blockId) {
		blockService.deleteBlock(blockId);
	}

	@DeleteMapping("/deleteFloor/{floorId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public void deleteFloor(@PathVariable("floorId") long floorId) {
		blockService.deleteFloor(floorId);
	}

	@DeleteMapping("/deleteRoom/{roomId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public void deleteRoom(@PathVariable("roomId") long roomId) {
		blockService.deleteRoom(roomId);
	}

	@DeleteMapping("/deleteSeat/{seatId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public void deleteSeat(@PathVariable("seatId") long seatId) {
		blockService.deleteSeat(seatId);
	}

	@GetMapping("/getAllSeats")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public List<Seat> getAllSeats() {
		return blockService.getAllSeats();
	}

}
